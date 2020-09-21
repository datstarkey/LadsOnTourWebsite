using AutoMapper;
using LadsOnTour.Models;
using LadsOnTour.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Services
{
    public class UserService
    {
        private readonly IMapper mapper;
        private readonly DatabaseContext context;
        private readonly LadBotService ladBot;

        public class StreamData
        {
            public string id;
            public string name;
        }

        public UserService(DatabaseContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
            ladBot = new LadBotService();
        }

        public UserDto GetUser(string id)
        {
            var user = context.users.Find(id);
            return mapper.Map<UserDto>(user);
        }

        public List<UserDto> GetAllUsers()
            => mapper.Map<List<UserDto>>(context.users.Where(u => u.InDiscord == "Yes").ToList()).ToList();

        public ApplicationDto GetApplication(string id)
        {
            var user = context.users.Find(id);
            return mapper.Map<ApplicationDto>(user);
        }

        public List<StreamData> GetTwitchIds() => context.users.Where(u => !string.IsNullOrEmpty(u.TwitchId)).Select(u => new StreamData { id = u.TwitchId, name = u.TwitchName }).ToList();

        public List<RosterDto> GetRoster() => mapper.Map<List<RosterDto>>(context.users.Where(u => u.InDiscord == "Yes").ToList());

        public List<ApplicationDto> GetApplications() => mapper.Map<List<ApplicationDto>>(context.users.ToList());

        public User FindOrAddUser(string id)
        {
            User local = context.users.Find(id);
            if (local == null)
            {
                local = new User
                {
                    DiscordID = id
                };
                context.Add(local);
                local = context.users.Find(id);
            }
            return local;
        }

        public WoWCharacter GetMain(User user) => context.wow_characters.FirstOrDefault(c => c.character_id == user.Main);

        public List<WoWCharacter> GetMains()
        {
            var raidersWithMains = context.users.Where(u => u.Main != 0 && u.InDiscord == "Yes").Select(u => u.Main).ToList();
            var wowCharacters = context.wow_characters.Where(c => raidersWithMains.Contains(c.character_id)).ToList();
            return wowCharacters;
        }

        public Task UpdateUser(User user)
        {
            string[] propList = new string[] { "Nickname", "Class", "Role", "About", "Experience", "AppLogs", "Armory", "BattleNet", "Days" };
            var local = FindOrAddUser(user.DiscordID);

            if (user.Class != "TBC")
                user.Role = WoWUtilities.CheckRole(user.Role, user.Class);

            Utils.CopyProperties(local, user, propList);

            if (user.AppStatus == "Sent" || user.AppStatus == "Not Sent")
                local.AppStatus = user.AppStatus;

            context.SaveChanges();
            return Task.CompletedTask;
        }

        public Task AdminUpdateUser(User user)
        {
            var local = FindOrAddUser(user.DiscordID);
            if (user.Class != "TBC")
                user.Role = WoWUtilities.CheckRole(user.Role, user.Class);

            Utils.CopyProperties(local, user);

            context.SaveChanges();
            return Task.CompletedTask;
        }

        public async Task UpdateApplication(User user)
        {
            var local = FindOrAddUser(user.DiscordID);
            local.AppStatus = user.AppStatus;

            if (local.AppStatus == "Accepted")
                await ladBot.AcceptUser(user);
            else if (local.AppStatus == "Declined")
                await ladBot.DeclineUser(user);

            context.SaveChanges();
        }

        public void UpdateTwitch(string id, string twitchId, string twitchName)
        {
            var local = FindOrAddUser(id);
            local.TwitchId = twitchId;
            local.TwitchName = twitchName;
            context.SaveChanges();
        }

        public void SetMain(string id, WoWCharacter character)
        {
            var local = FindOrAddUser(id);
            local.Main = character.character_id;

            if (!String.IsNullOrWhiteSpace(character.role))
                local.Role = character.role;

            if (!String.IsNullOrWhiteSpace(character._class))
                local.Class = character._class;

            if (character.guild == "Lads on Tour")
            {
                local.RankNumber = character.rank;
                local.Rank = character.rank_name;
            }

            if (!String.IsNullOrWhiteSpace(character.armory))
                local.Armory = character.armory;

            local.MainName = character.name;
            context.SaveChanges();
        }

        public Task ClearMain(string id)
        {
            var local = FindOrAddUser(id);
            local.Main = 0;
            local.Class = "TBC";
            local.Role = "TBC";
            local.Armory = "";
            local.MainName = "";
            context.SaveChanges();
            return Task.CompletedTask;
        }

        public void SetDiscordDetails(DiscordUser data)
        {
            if (String.IsNullOrWhiteSpace(data.Id))
                return;

            var user = FindOrAddUser(data.Id);
            user.Discord = data.Username;
            user.DiscordDiscriminator = data.Discriminator;
            user.InDiscord = data.InDiscord ? "Yes" : "No";
            context.SaveChanges();
        }

        public void SetBattleNetdAuthorization(BattleNetToken token, string id)
        {
            User user = context.users.Where(u => u.DiscordID == id).FirstOrDefault();
            if (user != null)
            {
                DateTime now = DateTime.Now;

                user.BattleNetToken = token.access_token;
                user.BattleNetTokenExpiration = now;
            }
        }

        public void UpdateAll()
        {
            var users = context.users.Where(u => u.InDiscord == "Yes" && u.Main > 0).ToList();

            foreach (var user in users)
            {
                try
                {
                    var main = GetMain(user);

                    if (main != null && main.guild == "Lads on Tour")
                    {
                        user.RankNumber = main.rank;
                        user.Rank = main.rank_name;
                    }
                }
                catch
                {
                    Console.WriteLine($"Main missing ${user.Discord}");
                }
            }
            context.SaveChanges();
        }
    }
}