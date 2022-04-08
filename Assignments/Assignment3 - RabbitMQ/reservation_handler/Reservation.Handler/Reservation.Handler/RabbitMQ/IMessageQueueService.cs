namespace Reservation.Handler.RabbitMQ
{
    public interface IMessageQueuePublisher
    {
        void Publish(Models.Reservation reservation, string topic, string exchange);
    }
}
