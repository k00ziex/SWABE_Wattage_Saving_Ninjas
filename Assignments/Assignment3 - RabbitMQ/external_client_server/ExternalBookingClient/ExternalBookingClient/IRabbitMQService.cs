using ExternalBookingClient.Models;

namespace ExternalBookingClient
{
    public interface IRabbitMqService
    {
        public void SendBooking(BookingInput input, string topic, string exchange);
    }
}