using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models
{
    public class ApplicationDto
    {
        public string DiscordID { get; set; }
        public string Discord { get; set; }
        public string NickName { get; set; }
        public string BattleNet { get; set; }

        public string Role { get; set; }
        public string Class { get; set; }

        public string Armory { get; set; }
        public string About { get; set; }
        public string Experience { get; set; }
        public string AppStatus { get; set; }
        public string AppLogs { get; set; }
    }
}