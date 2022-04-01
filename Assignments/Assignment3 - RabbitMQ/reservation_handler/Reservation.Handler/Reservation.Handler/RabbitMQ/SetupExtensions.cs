using RabbitMQ.Client;

namespace Reservation.Handler.RabbitMQ
{
    public static class SetupExtensions
    {
        public static void SetupRabbitMQ(this IServiceCollection serviceDescriptors)
        {
            var factory = new ConnectionFactory()
            {
                HostName = "localhost",
            };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {

            }
        }
    }
}
