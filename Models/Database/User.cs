using LadsOnTour.Models.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace LadsOnTour.Models
{
    public class User
    {
        [Key]
        public string DiscordID { get; set; }

        public string Rank { get; set; } = "Member";
        public int RankNumber { get; set; } = 10;
        public string Nickname { get; set; }
        public string Discord { get; set; }
        public string DiscordDiscriminator { get; set; }
        public string InDiscord { get; set; } = "no";

        public int Main { get; set; } = 0;
        public string MainName { get; set; }

        public string Role { get; set; }
        public string Class { get; set; }
        public string Armory { get; set; }
        public string Days { get; set; }

        public string TwitchId { get; set; }
        public string TwitchName { get; set; }

        public string BattleNet { get; set; }
        public string BattleNetToken { get; set; }
        public DateTime BattleNetTokenExpiration { get; set; } = DateTime.Now;

        public string About { get; set; }
        public string Experience { get; set; }
        public string AppStatus { get; set; }
        public string AppLogs { get; set; }

        public BisList BisList { get; set; } = new BisList();
    }
}