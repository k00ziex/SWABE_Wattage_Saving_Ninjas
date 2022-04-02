namespace Reservation.Handler.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int HotelId { get; set; }
        public string CheckIn { get; set; }
        public string CheckOut { get; set; }
        public int RoomNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAddress { get; set; }
    }
}
