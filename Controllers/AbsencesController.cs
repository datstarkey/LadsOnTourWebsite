using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LadsOnTour.Models;
using LadsOnTour.Models.Database;
using LadsOnTour.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LadsOnTour.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/absences")]
    public class AbsencesController : ControllerBase
    {
        private readonly AbsencesService absencesService;

        public AbsencesController(AbsencesService absencesService)
            => this.absencesService = absencesService;

        [HttpGet("all")]
        public List<Absence> GetAll()
            => absencesService.GetAllAbsences();

        [HttpGet]
        public List<Absence> GetAbsences()
        {
            var id = User.FindFirst("name").Value;
            return absencesService.GetUserAbsences(id);
        }

        [HttpPost]
        public IActionResult AddAbsence([FromBody] Absence absence)
        {
            if (User.IsInRole("Admin") || absence.DiscordID == User.FindFirst("name").Value)
            {
                absencesService.AddAbsence(absence);
                return Ok("Added Successfully");
            }
            else
            {
                return BadRequest("Can only add your own Absences");
            }
        }

        [HttpDelete]
        public IActionResult RemoveAbsence([FromBody] Absence absence)
        {
            if (User.IsInRole("Admin") || absence.DiscordID == User.FindFirst("name").Value)
            {
                absencesService.RemoveAbsence(absence);
                return Ok("Removed Successfully");
            }
            else
            {
                return BadRequest("Can only remove your own Absences");
            }
        }
    }
}