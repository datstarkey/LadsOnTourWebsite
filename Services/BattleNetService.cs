using ArgentPonyWarcraftClient;
using LadsOnTour.Models;
using LadsOnTour.Models.BattleNet;
using LadsOnTour.Utilities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace LadsOnTour.Services
{
    public class BattleNetService
    {
        private readonly DatabaseContext context;
        private string clientId;
        private string clientSecret;
        private string accessCode;
        private int kazzakID = 1305;
        private WarcraftClient warcraftClient;
        public string WarCraftLogsApiKey;

        public BattleNetService(DatabaseContext context, IConfiguration config)

        {
            this.context = context;
            clientId = config["BattleNet:ClientId"];
            clientSecret = config["BattleNet:ClientSecret"];
            WarCraftLogsApiKey = config["WarcraftLogs:ApiKey"];
            warcraftClient = new WarcraftClient(clientId, clientSecret, Region.Europe, Locale.en_GB);
        }

        private Dictionary<int, string> rank = new Dictionary<int, string>()
        {
            {0,"Guild Master"},
            {1,"Officer"},
            {2,"Raider"},
            {3,"Trial"},
            {4,"Veteran"},
            {5,"Social"},
            {6,"N/A" },
            {7,"N/A" },
            {8,"N/A" },
            {9,"N/A" },
            {10,"N/A" },
        };

        /// <summary>
        /// Gets API access token for general BattleNet API use.
        /// </summary>
        /// <returns></returns>
        public async Task<BattleNetToken> GetAccessToken()
        {
            var url = "https://eu.battle.net/oauth/token";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            string credentials = $"{clientId}:{clientSecret}";
            request.AddHeader("Authorization", $"Basic {Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials))}");
            request.AlwaysMultipartFormData = true;
            request.AddParameter("grant_type", "client_credentials");

            IRestResponse response = await client.ExecuteAsync(request);
            return JsonConvert.DeserializeObject<BattleNetToken>(response.Content);
        }

        /// <summary>
        /// Sets the BattletNet API token if we don't have one for this instance.
        /// </summary>
        /// <returns></returns>
        public async Task SetToken()
        {
            if (String.IsNullOrEmpty(accessCode))
            {
                BattleNetToken token = await GetAccessToken();
                accessCode = token.access_token;
            }
        }

        /// <summary>
        /// Gets Oauth token from BattleNet Oauth2 based on Oauth2 portal parameters.
        /// </summary>
        /// <param name="code">Access Code given by Oauth2 portal.</param>
        /// <param name="redirectUrl">Url redirected from by Oauth2 portal.</param>
        /// <returns></returns>
        public async Task<BattleNetToken> GetAuthorizationCode(string code, string redirectUrl)
        {
            var url = "https://eu.battle.net/oauth/token";
            var client = new RestClient(url);

            string credentials = $"{clientId}:{clientSecret}";

            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", $"Basic {Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials))}");
            request.AddParameter("redirect_uri", redirectUrl);
            request.AddParameter("scope", "wow.profile");
            request.AddParameter("grant_type", "authorization_code");
            request.AddParameter("code", code);
            request.AlwaysMultipartFormData = true;

            IRestResponse response = await client.ExecuteAsync(request);

            var tokenResponse = JsonConvert.DeserializeObject<BattleNetToken>(response.Content);
            return tokenResponse;
        }

        /// <summary>
        /// Confirms if a character exists in the database
        /// </summary>
        /// <param name="character">Profile for the character</param>
        /// <param name="userID">User Id for the user which the character should belong to</param>
        /// <returns></returns>
        public bool ValidCharacter(WoWCharacter character, string userID)
        {
            var dbCharacter = context.wow_characters.Find(character.character_id);
            return (dbCharacter != null && dbCharacter != null && dbCharacter.discord_id == userID) ? true : false;
        }

        /// <summary>
        /// Runs the UpdateCharacter function on every character in the database.
        /// </summary>
        /// <returns></returns>
        public async Task UpdateAllCharacters()
        {
            var characters = context.wow_characters.ToList();

            foreach (var character in characters)
            {
                try
                {
                    await UpdateCharacter(character);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
        }

        /// <summary>
        /// Updates the database with the character model given.
        /// Will not update Null fields
        /// </summary>
        /// <param name="character"></param>
        /// <returns></returns>
        public async Task UpdateCharacter(WoWCharacter character)
        {
            var dbCharacter = GetCharacter(character.character_id);
            if (dbCharacter != null)
            {
                var apiCharacter = await warcraftClient.GetCharacterProfileSummaryAsync(character.realm.ToLower(), character.name.ToLower(), "profile-eu");
                if (apiCharacter.Success)
                {
                    dbCharacter._class = apiCharacter.Value.CharacterClass.Name;
                    dbCharacter.level = apiCharacter.Value.Level;
                    dbCharacter.guild = apiCharacter.Value.Guild.Name;
                    dbCharacter.armory = ConvertToArmoryURL(character);
                    dbCharacter.role = WoWUtilities.CheckRole(character.role, character._class);
                    dbCharacter.averageIlevel = apiCharacter.Value.AverageItemLevel;
                    dbCharacter.equippedIlevel = apiCharacter.Value.EquippedItemLevel;
                    dbCharacter = await UpdateEquipment(dbCharacter);

                    context.SaveChanges();
                }
            }
        }

        /// <summary>
        /// Updates equipment for a set character
        /// </summary>
        /// <param name="character"></param>
        /// <returns></returns>
        private async Task<WoWCharacter> UpdateEquipment(WoWCharacter character)
        {
            var equipment = await warcraftClient.GetCharacterEquipmentSummaryAsync(character.realm.ToLower(), character.name.ToLower(), "profile-eu");
            if (equipment.Success)
                character.equipment = JsonConvert.SerializeObject(equipment.Value.EquippedItems);

            return character;
        }

        /// <summary>
        /// Returns a character based on its ID
        /// </summary>
        /// <param name="characterId"></param>
        /// <returns></returns>
        public WoWCharacter GetCharacter(int characterId) => context.wow_characters.Find(characterId);

        /// <summary>
        /// Loads All users characters from the BattleNet API and stores them in the database.
        /// </summary>
        /// <param name="accessToken">users Access token for the BattleNet API</param>
        /// <param name="userId">users ID to link character to user</param>
        /// <returns></returns>
        public async Task<Task> SetCharactersFromBattleNet(BattleNetToken token, string userId)
        {
            await SetToken();
            var account = await warcraftClient.GetAccountProfileSummaryAsync(token.access_token, "profile-eu");

            if (account.Success && account.Value.WowAccounts != null)
            {
                foreach (var wowAccount in account.Value.WowAccounts)
                {
                    foreach (var character in wowAccount.Characters)
                    {
                        if (character?.Id != null && character.Realm.Id == kazzakID && character.Faction.Name == "Horde" && character?.Level > 0)
                        {
                            try
                            {
                                var id = character.Id;
                                var wowCharacter = context.wow_characters.Where(c => c.character_id == id).FirstOrDefault();
                                if (wowCharacter == null)
                                {
                                    wowCharacter = new WoWCharacter();
                                    wowCharacter.name = character.Name;
                                    wowCharacter.realm = character.Realm.Name;
                                    wowCharacter.character_id = id;
                                    wowCharacter.discord_id = userId;
                                    context.Add(wowCharacter);
                                    context.SaveChanges();
                                }
                                await UpdateCharacter(wowCharacter);
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine(e);
                            }
                        }
                    }
                }
            }

            await SetGuildRanks(userId);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Return all characters in the databse related to a user.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<WoWCharacter> GetCharacters(string id)
            => context.wow_characters.Where(c => c.discord_id == id).ToList();

        /// <summary>
        /// Returns all characters from the database
        /// </summary>
        /// <returns></returns>
        public List<WoWCharacter> GetAllChacters()
            => context.wow_characters.ToList();

        /// <summary>
        /// Generate the Armory url from a character model
        /// </summary>
        /// <param name="character"></param>
        /// <returns></returns>
        private string ConvertToArmoryURL(WoWCharacter character) => $"https://worldofwarcraft.com/en-gb/character/eu/{character.realm}/{character.name}";

        /// <summary>
        /// Set the ranks for guild members
        /// </summary>
        /// <param name="id"></param>
        /// <param name="all"></param>
        /// <returns></returns>
        public async Task<Task> SetGuildRanks(string id, bool all = false)
        {
            await SetToken();

            var client = new RestClient($"https://eu.api.blizzard.com/data/wow/guild/kazzak/lads-on-tour/roster?namespace=profile-eu&access_token={accessCode}");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);

            if (response.StatusCode != HttpStatusCode.OK)
                return Task.CompletedTask;

            var guildMembers = JsonConvert.DeserializeObject<BattleNetGuildMembers>(response.Content);

            var characters = all ? context.wow_characters.ToList() : GetCharacters(id);

            foreach (var character in characters)
            {
                try
                {
                    var dbCharacter = context.wow_characters.Find(character.character_id);
                    if (character.guild == "Lads on Tour")
                    {
                        var person = guildMembers.members.Where(m => m.character.name == character.name).FirstOrDefault();
                        dbCharacter.rank = person != null ? person.rank : 10;
                    }
                    else
                    {
                        dbCharacter.rank = 10;
                    }
                    dbCharacter.rank_name = rank[dbCharacter.rank];
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }

            context.SaveChanges();
            return Task.CompletedTask;
        }
    }
}