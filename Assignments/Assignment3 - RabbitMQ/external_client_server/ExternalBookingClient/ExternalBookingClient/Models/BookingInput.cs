namespace ExternalBookingClient.Models
{
    public class BookingInput
    {
        public double HotelId { get; set; }
        public string CheckIn { get; set; } // ISO 8601 Date
        public string CheckOut { get; set; } // ISO 8601 Date
        public double RoomNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAddress { get; set; }

    }
}