using System;
using System.ComponentModel.DataAnnotations;

namespace LadsOnTour.Models.Database
{
    public class Absence
    {
        [Key]
        public int Id { get; set; }

        public string DiscordID { get; set; }
        public string Discord { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
    }
}