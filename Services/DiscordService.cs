using LadsOnTour.Models;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LadsOnTour.Services
{
    public class DiscordService
    {
        private string clientId;
        private string clientSecret;

        public DiscordService(IConfiguration config)
        {
            clientId = config["Discord:ClientId"];
            clientSecret = config["Discord:ClientSecret"];
        }

        private string discordLoginUrl = "https://discord.com/api/oauth2/token";
        private string discordApiUrl = "https://discordapp.com/api/v6/";
        private string guildID = "699328485998592132";

        public class OAuthResponse
        {
            public string access_token { get; set; }
            public string token_type { get; set; }
            public string expires_in { get; set; }
            public string refresh_token { get; set; }
            public string scope { get; set; }
        }

        public async Task<OAuthResponse> GetToken(string code, string redirectURL, bool refresh = false)
        {
            string grantType = refresh ? "refresh_token" : "authorization_code";
            string codeParameter = refresh ? "refresh_token" : "code";

            var client = new RestClient(discordLoginUrl);
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("content", "application/x-www-form-urlencoded");
            request.AlwaysMultipartFormData = true;
            request.AddParameter("client_id", clientId);
            request.AddParameter("client_secret", clientSecret);
            request.AddParameter("grant_type", grantType);
            request.AddParameter(codeParameter, code);
            request.AddParameter("redirect_uri", redirectURL);
            request.AddParameter("scope", "identify guilds");

            var response = await client.ExecuteAsync(request);
            return Newtonsoft.Json.JsonConvert.DeserializeObject<OAuthResponse>(response.Content);
        }

        public async Task<DiscordUser> GetUser(string accessToken)
        {
            var client = new RestClient($"{discordApiUrl}/users/@me");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", $"Bearer {accessToken}");
            request.AlwaysMultipartFormData = true;
            IRestResponse response = await client.ExecuteAsync(request);
            DiscordUser user = Newtonsoft.Json.JsonConvert.DeserializeObject<DiscordUser>(response.Content);
            user.InDiscord = await IsUserInGuild(accessToken);
            return user;
        }

        public async Task<bool> IsUserInGuild(string accessToken)
        {
            var client = new RestClient($"{discordApiUrl}/users/@me/guilds");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", $"Bearer {accessToken}");
            IRestResponse response = await client.ExecuteAsync(request);
            var Guilds = Newtonsoft.Json.JsonConvert.DeserializeObject<List<DiscordGuild>>(response.Content);
            return Guilds.Find(guild => guild.Id == guildID) != null ? true : false;
        }
    }
}