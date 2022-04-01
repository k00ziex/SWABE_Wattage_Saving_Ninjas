using ExternalBookingClient.Models;

namespace ExternalBookingClient
{
    public interface IRabbitMqService
    {
        public void InstantiateRabbitMq();
        public void SendBooking(BookingInput input, string topic, string exchange);
    }
}