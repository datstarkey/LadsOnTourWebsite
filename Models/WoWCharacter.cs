using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models
{
    public class WoWCharacter
    {
        [Key]
        public int character_id { get; set; }

        public string discord_id { get; set; }
        public string name { get; set; }
        public string _class { get; set; }
        public string role { get; set; }
        public string realm { get; set; }
        public int rank { get; set; }
        public string rank_name { get; set; }
        public string armory { get; set; }
        public string guild { get; set; }
        public int level { get; set; }
    }
}