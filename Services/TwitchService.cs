using LadsOnTour.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using static LadsOnTour.Services.UserService;

namespace LadsOnTour.Services
{
    public class TwitchService
    {
        private string clientId;
        private string clientSecret;
        private string tokenRequestUrl = "https://id.twitch.tv/oauth2/token";
        private string userRequestUrl = "https://api.twitch.tv/helix/";
        private string appAccessToken;

        public TwitchService(IConfiguration config)
        {
            clientId = config["Twitch:ClientId"];
            clientSecret = config["Twitch:ClientSecret"];
        }

        public class Token
        {
            public string access_token { get; set; }
            public string token_type { get; set; }
            public string expires_in { get; set; }
            public string refresh_token { get; set; }
            public string scope { get; set; }
        }

        public class UserInfo
        {
            public ChannelInfo[] data { get; set; }
        }

        public class ChannelInfo
        {
            public string broadcaster_type { get; set; }
            public string description { get; set; }
            public string display_name { get; set; }
            public string id { get; set; }
            public string login { get; set; }
            public string type { get; set; }
            public string view_count { get; set; }
        }

        public class StreamInfo
        {
            public List<string> live;
            public List<string> offline;
        }

        public class LiveStreamData
        {
            public List<LiveStream> data;
        }

        public class LiveStream
        {
            public string user_id;
            public string viewer_count;
        }

        private async Task<string> AppToken()
        {
            if (!String.IsNullOrEmpty(appAccessToken))
                return appAccessToken;

            var client = new RestClient(tokenRequestUrl);
            var request = new RestRequest(Method.POST);
            request.AddQueryParameter("client_id", clientId);
            request.AddQueryParameter("client_secret", clientSecret);
            request.AddQueryParameter("grant_type", "client_credentials");
            request.AddQueryParameter("scopes", "");

            var response = await client.ExecuteAsync(request);
            var token = Newtonsoft.Json.JsonConvert.DeserializeObject<Token>(response.Content);
            appAccessToken = token.access_token;
            return appAccessToken;
        }

        public StreamInfo GetStreamList(string streamData, List<StreamData> streams)
        {
            var offline = new List<string>();
            var live = new List<string>();
            var parsed = Newtonsoft.Json.JsonConvert.DeserializeObject<LiveStreamData>(streamData);

            foreach (var stream in streams)
            {
                bool isLive = false;

                foreach (var liveStream in parsed.data)
                {
                    if (liveStream.user_id == stream.id)
                        isLive = true;
                }

                if (isLive)
                    live.Add(stream.name);
                else
                    offline.Add(stream.name);
            }

            StreamInfo streamInfo = new StreamInfo { live = live, offline = offline };
            return streamInfo;
        }

        public async Task<string> GetStreamData(List<StreamData> streams)
        {
            var token = await AppToken();

            var client = new RestClient(userRequestUrl + "streams");
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", $"Bearer {token}");
            request.AddHeader("client-id", clientId);

            foreach (var stream in streams)
            {
                request.AddQueryParameter("user_id", stream.id);
            }

            var response = await client.ExecuteAsync(request);
            return response.Content;
        }

        public async Task<Token> GetAccessToken(string authCode, string redirect)
        {
            var client = new RestClient(tokenRequestUrl);
            var request = new RestRequest(Method.POST);
            request.AddQueryParameter("client_id", clientId);
            request.AddQueryParameter("client_secret", clientSecret);
            request.AddQueryParameter("code", authCode);
            request.AddQueryParameter("grant_type", "authorization_code");
            request.AddQueryParameter("redirect_uri", redirect);

            var response = await client.ExecuteAsync(request);
            return Newtonsoft.Json.JsonConvert.DeserializeObject<Token>(response.Content);
        }

        public async Task<UserInfo> GetChannelInfo(string accessToken)
        {
            var client = new RestClient(userRequestUrl + "users");
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", $"Bearer {accessToken}");
            request.AddHeader("client-id", clientId);
            var response = await client.ExecuteAsync(request);
            var result = Newtonsoft.Json.JsonConvert.DeserializeObject<UserInfo>(response.Content);
            return result;
        }
    }
}