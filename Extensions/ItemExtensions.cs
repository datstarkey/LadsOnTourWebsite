using ArgentPonyWarcraftClient;
using LadsOnTour.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Extensions
{
    public static class ItemExtensions
    {
        public static WoWItem ToWowItem(this Item item)
        {
            return new WoWItem()
            {
                Id = item.Id,
                Name = item.Name,
                InventoryType = item.InventoryType.Name,
                ItemClass = item.ItemClass.Name,
                ItemSubClass = item.ItemSubclass.Name,
            };
        }
    }
}