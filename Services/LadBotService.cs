﻿using LadsOnTour.Models;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Services
{
    public class LadBotService
    {
        private string url = "http://localhost:9050/api/v1/";

        public async Task AcceptUser(User user)
        {
            var client = new RestClient($"{url}acceptApplication");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(user);
            var response = await client.ExecuteAsync(request);
        }

        public async Task DeclineUser(User user)
        {
            var client = new RestClient($"{url}declineApplication");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(user);
            await client.ExecuteAsync(request);
        }

        public async Task NewApplication(User user)
        {
            var client = new RestClient($"{url}newApplication");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(user);
            await client.ExecuteAsync(request);
        }
    }
}