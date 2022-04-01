using Microsoft.EntityFrameworkCore;
using Reservation.Handler.Models;

namespace Reservation.Handler.DatabaseContext
{
    public class ReservationContext : DbContext
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ReservationContext(DbContextOptions<ReservationContext> options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
            : base(options) { }

        public DbSet<Models.Reservation> Reservations { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ReservationContext).Assembly);
        }
    }
}
