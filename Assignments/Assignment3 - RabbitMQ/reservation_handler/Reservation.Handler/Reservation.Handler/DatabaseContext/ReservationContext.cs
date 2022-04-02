using Microsoft.EntityFrameworkCore;
using Reservation.Handler.Models;

namespace Reservation.Handler.DatabaseContext
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options)
            : base(options) { }

        public DbSet<Models.Reservation> Reservations { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ReservationContext).Assembly);
        }
    }
}
