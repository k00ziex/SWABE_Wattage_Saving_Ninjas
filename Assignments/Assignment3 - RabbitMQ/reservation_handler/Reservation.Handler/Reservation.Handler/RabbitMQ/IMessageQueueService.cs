namespace Reservation.Handler.RabbitMQ
{
    public interface IMessageQueueService
    {
        void SendReservation(Models.Reservation reservation, string topic, string exchange);
    }
}
