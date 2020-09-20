using LadsOnTour.Models;
using LadsOnTour.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LadsOnTour.Controllers
{
    /// <summary>
    /// User actions for authenticated users.
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UsersController : ControllerBase
    {
        private BattleNetService armory;
        private UserService userService;

        public UsersController(BattleNetService armory, UserService userService)
        {
            this.armory = armory;
            this.userService = userService;
        }

        /// <summary>
        /// Returns entire roster of guild.
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("Roster")]
        public List<RosterDto> GetRoster() => userService.GetRoster();

        /// <summary>
        /// Returns the warcraft logs api key protected under cors
        /// </summary>
        /// <returns></returns>
        [HttpGet("warcraftlogs")]
        public IActionResult GetWarcraftLogsApiKey() => Ok(Newtonsoft.Json.JsonConvert.SerializeObject(armory.WarCraftLogsApiKey));

        /// <summary>
        /// returns all wow charcters that are mains
        /// </summary>
        /// <returns></returns>
        [HttpGet("allmains")]
        public List<WoWCharacter> GetAllMains() => userService.GetMains();

        /// <summary>
        /// Returns the current user from the JWT supplied
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public UserDto GetUser() => userService.GetUser(User.FindFirst("name").Value);

        /// <summary>
        /// Updates current user from the JWT supplied with the user supplied
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            await userService.UpdateUser(user);
            return Ok($"Updated user {user.Discord} successfully");
        }

        /// <summary>
        /// Clears a users main character from the JWT supplied.
        /// </summary>
        /// <returns></returns>
        [HttpPost("clearmain")]
        public async Task<IActionResult> ClearMain()
        {
            await userService.ClearMain(User.FindFirst("name").Value);
            return Ok("Main Cleared");
        }

        /// <summary>
        /// Updates a users character from the character supplied.
        /// If querystring main is supplied then will label that character as users main.
        /// </summary>
        /// <returns></returns>
        [HttpPost("character")]
        public async Task<IActionResult> UpdateCharacter([FromBody] WoWCharacter character, [FromQuery(Name = "main")] bool isMain)
        {
            var id = User.FindFirst("name").Value;

            if (character.character_id <= 0)
                return BadRequest("No Character_id given");

            if (armory.ValidCharacter(character, id))
            {
                await armory.UpdateCharacter(character);
                if (isMain)
                    userService.SetMain(id, character);

                return Ok("Update Successfull");
            }

            return BadRequest("Error, cant find character or character does not belong to you, please refresh characters");
        }

        /// <summary>
        /// Returns a list of all the current users characters from supplied JWT.
        /// </summary>
        /// <returns></returns>
        [HttpGet("characters")]
        public List<WoWCharacter> GetCharacters()
            => armory.GetCharacters(User.FindFirst("name").Value);

        /// <summary>
        /// Links all characters from the BattleNet API.
        /// Requires query parameters from the BattletNet Oauth2 portal.
        /// </summary>
        /// <param name="code">BattleNet Oauth2 portal access code.</param>
        /// <param name="redirectUrl">Url redirected from BattleNet Oauth2 portal.</param>
        /// <returns></returns>
        [HttpPost("characters")]
        public async Task<IActionResult> LinkCharacters([FromQuery(Name = "code")] string code, [FromQuery(Name = "url")] string redirectUrl)
        {
            var id = User.FindFirst("name").Value;
            var battleNetToken = await armory.GetAuthorizationCode(code, redirectUrl);

            userService.SetBattleNetdAuthorization(battleNetToken, id);
            await armory.SetCharactersFromBattleNet(battleNetToken, id);

            if (!String.IsNullOrEmpty(battleNetToken.access_token))
                return Ok("Linked Successfully");
            return BadRequest("Couldn't connect to battle.net");
        }

        /// <summary>
        /// Retrieve all users in the discord
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
            => Ok(userService.GetAllUsers());

        /// <summary>
        /// Updates all characters in database from BattleNet Armory.
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPost("Updateall")]
        public async Task<IActionResult> UpdateAllRequest()
        {
            await armory.UpdateAllCharacters();
            await armory.SetGuildRanks("", true);
            userService.UpdateAll();
            return Ok("Update Finished");
        }
    }
}