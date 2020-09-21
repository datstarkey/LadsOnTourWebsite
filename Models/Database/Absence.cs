using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models.Database
{
    public class Absence
    {
        [Key]
        public string DiscordID { get; set; }

        public string Discord { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
    }
}