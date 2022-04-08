namespace Reservation.Handler
{
    internal class Constants
    {
        // new
        public const string Hotel_Room_Exchange_Name = "ReservationExchange";
        public const string Hotel_Room_Queue = "ReservationQueue";
        public const string Hotel_Room_Topic = "hotel.room.reservation.topic";

        public const string Confirmation_Exchange_Name = "ConfirmationExchange";
        public const string Confirmation_Queue = "ConfirmationQueue";
        public const string Confirmation_Topic = "hotel.room.confirmation.topic";
    }
}
