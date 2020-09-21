using LadsOnTour.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace LadsOnTour.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> users { get; set; }
        public DbSet<WoWCharacter> wow_characters { get; set; }
        public DbSet<Absence> Absences { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity =>
            {
                entity.HasKey(p => p.DiscordID);
            });

            base.OnModelCreating(builder);
        }
    }
}