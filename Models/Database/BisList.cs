using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LadsOnTour.Models.Database
{
    public class BisList
    {
        [Key]
        public int Id { get; set; }

        public int HelmId { get; set; }
        public int NeckId { get; set; }
        public int ShoulderId { get; set; }
        public int CloakId { get; set; }
        public int ChestId { get; set; }
        public int WristId { get; set; }
        public int GloveId { get; set; }
        public int WaistId { get; set; }
        public int LegId { get; set; }
        public int Ring1Id { get; set; }
        public int Ring2Id { get; set; }
        public int Trinket1Id { get; set; }
        public int Trinket2Id { get; set; }
        public int MainHandId { get; set; }
        public int OffHandId { get; set; }
    }
}