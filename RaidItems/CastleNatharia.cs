using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.RaidItems
{
    public static class CastleNatharia
    {
        public static List<int> Shriekwing = new List<int>() { 183034, 182976, 182993, 183027, 182979, 184016 };
        public static List<int> HuntsmanAltimor = new List<int>() { 183040, 182998, 183018, 182995, 184017,183892 };
        public static List<int> SunKingsSalvation = new List<int>() {182893, 183033, 182986, 182977, 183007, 183025, 184019, 184018, 184020 };
        public static List<int> ArtificerXymox = new List<int>() { 183888,182987, 183019, 183004, 183012, 183038, 184021 };
        public static List<int> HungeringDestroyer = new List<int>() {183891, 183001, 182994, 183000, 183009, 183028, 182992, 183024, 184022, 184023 };
        public static List<int> LadyInervaDarkvein = new List<int>() {183889, 183021, 183026, 183015, 182985, 183037, 184025 };
        public static List<int> TheCouncilofBlood = new List<int>() {183890, 183039, 182989, 183014, 183011, 183030, 183023, 182983, 184024 };
        public static List<int> Sludegefist = new List<int>() { 182999, 182984, 183022, 183005, 183016, 182981, 183006, 184026 };
        public static List<int> StoneLegionGenerals = new List<int>() { 183895, 183894, 183029, 183032, 183998, 182991, 183002, 184027 };
        public static List<int> SireDenathrius = new List<int>() {183896,183897,183898,183899, 182997, 182980, 183003, 183020, 183036, 184028, 184030, 184029, 184031 };

        public static List<int> AllItems = Shriekwing
            .Concat(HuntsmanAltimor)
            .Concat(SunKingsSalvation)
            .Concat(ArtificerXymox)
            .Concat(HungeringDestroyer)
            .Concat(LadyInervaDarkvein)
            .Concat(TheCouncilofBlood)
            .Concat(Sludegefist)
            .Concat(StoneLegionGenerals)
            .Concat(SireDenathrius)
            .ToList();

        public static Dictionary<int, List<int>> Bosses = new Dictionary<int, List<int>>()
        {
            {1,Shriekwing },
            {2,HuntsmanAltimor },
            {3,SunKingsSalvation },
            {4,ArtificerXymox },
            {5,HungeringDestroyer },
            {6,LadyInervaDarkvein },
            {7,TheCouncilofBlood },
            {8,Sludegefist },
            {9,StoneLegionGenerals },
            {10,SireDenathrius },
        };
    }
}