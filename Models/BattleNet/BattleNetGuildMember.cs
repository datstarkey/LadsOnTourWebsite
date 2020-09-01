using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models.BattleNet
{
    public class BattleNetGuildMember
    {
        public BattleNetCharacter character { get; set; }
        public int rank { get; set; }
    }
}