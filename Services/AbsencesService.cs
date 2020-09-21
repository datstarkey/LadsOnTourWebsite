using LadsOnTour.Models;
using LadsOnTour.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LadsOnTour.Services
{
    public class AbsencesService
    {
        private readonly DatabaseContext context;

        public AbsencesService(DatabaseContext context)
            => this.context = context;

        /// <summary>
        /// Returns all absences from today onwards
        /// </summary>
        /// <returns></returns>
        public List<Absence> GetAllAbsences()
            => context.Absences.Where(a => a.EndTime >= DateTime.Now).ToList();

        /// <summary>
        /// returns all absences for a specific user from today onwards
        /// </summary>
        /// <param name="discordId"></param>
        /// <returns></returns>
        public List<Absence> GetUserAbsences(string discordId)
            => context.Absences.Where(a => a.DiscordID == discordId && a.EndTime >= DateTime.Now).ToList();

        /// <summary>
        /// Add absence to the database
        /// </summary>
        /// <param name="absence"></param>
        public void AddAbsence(Absence absence)
        {
            context.Add(absence);
            context.SaveChanges();
        }

        /// <summary>
        /// Remove absence from the database
        /// </summary>
        /// <param name="absence"></param>
        public void RemoveAbsence(Absence absence)
        {
            context.Remove(absence);
            context.SaveChanges();
        }
    }
}