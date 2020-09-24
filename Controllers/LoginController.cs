using LadsOnTour.Models;
using LadsOnTour.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LadsOnTour.Controllers
{
    /// <summary>
    /// Used to login to the API and get a supplied JWT.
    /// Will use discord Oauth to authenticate user and return user details
    /// </summary>
    [ApiController]
    [Route("api/v1/login")]
    public class LoginController : ControllerBase
    {
        private readonly DatabaseContext context;
        private readonly DiscordService discord;
        private readonly UserService users;
        private readonly IConfiguration config;

        public class LoginResponse
        {
            public string RefreshToken { get; set; }
            public DiscordUser User { get; set; }
            public string Token { get; set; }
        }

        public LoginController(DatabaseContext context, IConfiguration config, UserService users, DiscordService discord)
        {
            this.config = config;
            this.context = context;
            this.users = users;
            this.discord = discord;
        }

        /// <summary>
        /// Login for API use only with API key
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Login()
        {
            var apiKey = Request.Headers["Authorization"];

            //Not a create way to do this, need to log at using multiple authentication with the Authorize attribute
            if (apiKey.Any())
            {
                var authKey = config["APIKeys:Keys"];
                var key = apiKey.ToString().Split(" ")[1];

                if (authKey == key)
                    return Ok(GenerateAPIJWT("LadBot"));
            }

            return BadRequest("API key not given or invalid");
        }

        /// <summary>
        /// Login for user, needs the query parameters from the Discord Oauth2 portal.
        /// If Refresh is supplied will refresh he JWT.
        /// </summary>
        /// <param name="accessCode">Discord Access Code</param>
        /// <param name="redirectUrl">Url redirected to</param>
        /// <param name="refresh">Refresh code to refresh login if supplied</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Login([FromQuery(Name = "code")] string accessCode, [FromQuery(Name = "url")] string redirectUrl, [FromQuery(Name = "refresh")] bool refresh)
        {
            DiscordService.OAuthResponse response = await discord.GetToken(accessCode, redirectUrl, refresh);

            //An error with discord login - need to log more effectively
            if (string.IsNullOrEmpty(response.access_token))
                return BadRequest("Error with discord login");

            //Get the User from discord
            DiscordUser user = await discord.GetUser(response.access_token);

            //Error with the discord Oauth - need to log more effectively
            if (string.IsNullOrEmpty(user.Username))
                return BadRequest("Error with discord authentication");

            users.SetDiscordDetails(user);

            //If Authenticated with discord, send login information with refresh code and JWT
            LoginResponse loginResponse = new LoginResponse()
            {
                RefreshToken = response.refresh_token,
                User = user,
                Token = GenerateJSONWebToken(user)
            };

            return Ok(loginResponse);
        }

        /// <summary>
        /// Generates a JWT for an api user based on their Id.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private string GenerateAPIJWT(string id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim("name", id),
                new Claim("role", "Admin"),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
                      config["Jwt:Issuer"],
                      claims,
                      expires: DateTime.Now.AddDays(1),
                      signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Generates a JWT for a user, will assign a roles based on guild rank and Discord rights.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string GenerateJSONWebToken(DiscordUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim("name", user.Id)
            };

            //Adds if they are in discord as a roll
            if (user.InDiscord)
            {
                claims.Add(new Claim("role", "InDiscord"));
                claims.Add(new Claim(ClaimTypes.Role, "InDiscord"));
            }

            //Adds role based on character rank
            var dbUser = context.users.Where(u => u.DiscordID == user.Id).FirstOrDefault();
            if (user != null)
            {
                if (dbUser.RankNumber <= 1)
                {
                    claims.Add(new Claim("role", "Admin"));
                    claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                }

                if (dbUser.RankNumber <= 3)
                {
                    claims.Add(new Claim("role", "Raider"));
                    claims.Add(new Claim(ClaimTypes.Role, "Raider"));
                }
            }

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
                      config["Jwt:Issuer"],
                      claims,
                      expires: DateTime.Now.AddDays(1),
                      signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}