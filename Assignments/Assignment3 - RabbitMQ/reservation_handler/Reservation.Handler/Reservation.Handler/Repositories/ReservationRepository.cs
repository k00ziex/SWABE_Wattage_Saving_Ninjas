using Microsoft.EntityFrameworkCore;
using Reservation.Handler.DatabaseContext;
using Reservation.Handler.Models;

namespace Reservation.Handler.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ReservationContext _context;

        public ReservationRepository(IServiceScopeFactory factory)
        {
            _context = factory.CreateScope().ServiceProvider.GetRequiredService<ReservationContext>();
        }

        public async Task Delete(int id)
        {
            _context.Remove(id);
            await _context.SaveChangesAsync();
        }

        public async Task<Models.Reservation> Insert(ReservationDto source)
        {
            if(source is null)
                throw new ArgumentNullException(nameof(source));

            //  ISO 8601 conversation
            var checkInDateTime = DateTime.Parse(source.CheckIn, null, System.Globalization.DateTimeStyles.RoundtripKind); 
            var checkOutDateTime = DateTime.Parse(source.CheckOut, null, System.Globalization.DateTimeStyles.RoundtripKind);

            // First check if room reservation exist
            var reservationExist = await _context.Reservations
                .Where(x => x.HotelId == source.HotelId && x.RoomNo == source.RoomNo)
                .Where(x => x.CheckIn < checkInDateTime && checkInDateTime < x.CheckOut)
                .Where(x => x.CheckIn < checkOutDateTime && checkOutDateTime < x.CheckOut)
                .FirstOrDefaultAsync();

            if (reservationExist != null)
                throw new ArgumentOutOfRangeException($"Reservation in that timeframe for Hotel id: {source.HotelId} and room numbeer: {source.RoomNo} already exists");

            var reservationInput = new Models.Reservation() {
                ReservationId = Guid.NewGuid().ToString(),
                HotelId = source.HotelId,
                CheckIn = checkInDateTime,
                CheckOut = checkOutDateTime,
                RoomNo = source.RoomNo,
                CustomerName = source.CustomerName,
                CustomerEmail = source.CustomerEmail,
                CustomerAddress = source.CustomerAddress,
            };

            await _context.Reservations.AddAsync(reservationInput);

            await _context.SaveChangesAsync();

            return reservationInput;
        }
    }
}
