using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models
{
    public class RosterDto
    {
        public string Discord { get; set; }
        public string Nickname { get; set; }
        public string Rank { get; set; }
        public string Armory { get; set; }
        public string Role { get; set; }
        public string Class { get; set; }
    }
}