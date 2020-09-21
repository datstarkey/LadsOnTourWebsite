using LadsOnTour.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LadsOnTour.Controllers
{
    /// <summary>
    /// Twitch integration controller.
    /// Will allow a user to authenticate their twitch account and get current active streams
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TwitchController : ControllerBase
    {
        private readonly TwitchService twitch;
        private readonly UserService users;

        public TwitchController(TwitchService twitch, UserService users)
        {
            this.twitch = twitch;
            this.users = users;
        }

        /// <summary>
        /// Will link a twitch profile with user profile.
        /// Requres parameters from the Oauth2 portal.
        /// </summary>
        /// <param name="code">Access code given from Oauth2</param>
        /// <param name="redirectUrl">Url redicrected to from Oauth2</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SyncTwitch([FromQuery(Name = "code")] string code, [FromQuery(Name = "url")] string redirectUrl)
        {
            //Gets Id from JWT
            var id = User.FindFirst("name").Value;

            var token = await twitch.GetAccessToken(code, redirectUrl);

            if (String.IsNullOrEmpty(token.access_token))
                return BadRequest("Error syncing with twitch");

            var userInfo = await twitch.GetChannelInfo(token.access_token);

            users.UpdateTwitch(id, userInfo.data[0].id, userInfo.data[0].login);

            return Ok("Synced Twitch profile successfully");
        }

        /// <summary>
        /// Get a list of streams of Twitch enabled users.
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetStreams()
        {
            var ids = users.GetTwitchIds();
            var streamData = await twitch.GetStreamData(ids);
            TwitchService.StreamInfo list = twitch.GetStreamList(streamData, ids);

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(list);
            return Ok(json);
        }

        /// <summary>
        /// List of user Ids with Twitch enabled
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("users")]
        public IActionResult GetIds()
        {
            var ids = users.GetTwitchIds();
            return Ok(ids);
        }
    }
}