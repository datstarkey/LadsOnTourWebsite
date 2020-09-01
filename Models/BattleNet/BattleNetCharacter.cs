using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models.BattleNet
{
    public class BattleNetCharacter
    {
        public string name { get; set; }
        public BattleNetRealm realm { get; set; }
        public BattleNetPlayableClass playable_Class { get; set; }
        public BattleNetFaction faction { get; set; }
        public int level { get; set; }
        public int id { get; set; }
    }
}