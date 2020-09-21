using LadsOnTour.Models;
using LadsOnTour.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LadsOnTour.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/application")]
    public class ApplicationController : ControllerBase
    {
        private readonly UserService userService;

        public ApplicationController(UserService userService)
            => this.userService = userService;

        /// <summary>
        /// Gets all applications from all users
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Raider")]
        [HttpGet("all")]
        public List<ApplicationDto> GetAll() => userService.GetApplications();

        /// <summary>
        /// Get the current users application from the JWT
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ApplicationDto GetApplication()
        {
            var id = User.FindFirst("name").Value;
            return userService.GetApplication(id);
        }

        /// <summary>
        /// Update a users application
        /// </summary>
        /// <param name="user">User profile</param>
        /// <returns></returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> UpateApp([FromBody] User user)
        {
            await userService.UpdateApplication(user);
            return Ok("App Updated Succesfully");
        }
    }
}