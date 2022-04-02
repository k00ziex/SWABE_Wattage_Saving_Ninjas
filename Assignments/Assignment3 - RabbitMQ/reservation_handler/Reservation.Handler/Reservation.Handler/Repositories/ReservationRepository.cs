﻿using Reservation.Handler.DatabaseContext;
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


            var reservationInput = new Models.Reservation() {
                HotelId = source.HotelId,
                CheckIn = source.CheckIn,
                CheckOut = source.CheckOut,
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
