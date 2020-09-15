using System.Collections.Generic;

namespace LadsOnTour.Utilities
{
    public static class WoWUtilities
    {
        private static List<string> tanks = new List<string>() { "Paladin", "Demon Hunter", "Monk", "Death Knight", "Warrior", "Druid" };
        private static List<string> healers = new List<string>() { "Paladin", "Monk", "Druid", "Priest", "Shaman" };
        private static List<string> ranged = new List<string>() { "Druid", "Hunter", "Mage", "Priest", "Shaman", "Warlock" };
        private static List<string> melee = new List<string>() { "Death Knight", "Demon Hunter", "Hunter", "Priest", "Monk", "Paladin", "Rogue", "Shaman", "Warrior" };

        public static string CheckRole(string role, string _class)
        {
            if (_class == null || _class == "TBC")
            {
                return "TBC";
            }

            switch (role)
            {
                case "Healer":
                    if (!healers.Contains(_class))
                        return setDefaultRole(_class);
                    return role;

                case "Tank":
                    if (!tanks.Contains(_class))
                        return setDefaultRole(_class);
                    return role;

                case "Melee":
                    if (!melee.Contains(_class))
                        return setDefaultRole(_class);
                    return role;

                case "Ranged":
                    if (!ranged.Contains(_class))
                        return setDefaultRole(_class);
                    return role;

                case null:
                default:
                    return "TBC";
            }
        }

        public static string setDefaultRole(string _class)
        {
            if (!ranged.Contains(_class))
                if (!melee.Contains(_class))
                    return "error";
                else
                    return "Melee";
            else
                return "Ranged";
        }
    }
}