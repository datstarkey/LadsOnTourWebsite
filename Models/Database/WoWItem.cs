using ArgentPonyWarcraftClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models.Database
{
    public class WoWItem
    {
        public int Id { get; set; }
        public string InventoryType { get; set; }
        public string ItemClass { get; set; }
        public string ItemSubClass { get; set; }
        public string Name { get; set; }
    }
}