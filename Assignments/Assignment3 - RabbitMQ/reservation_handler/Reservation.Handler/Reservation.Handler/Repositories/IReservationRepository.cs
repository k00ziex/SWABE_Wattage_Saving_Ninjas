using Reservation.Handler.Models;

namespace Reservation.Handler.Repositories
{
    public interface IReservationRepository
    {
        Task<Models.Reservation> Insert(ReservationDto source);
        Task Delete(string id);
        Task<Models.Reservation> FindById(string id);
    }
}
