using System.Text;
using System.Text.Json;
using ExternalBookingClient.Models;
using RabbitMQ.Client;

namespace ExternalBookingClient
{
    public class RabbitMQService : IRabbitMqService
    {
        private IConnection _rabbitConnection;

        public RabbitMQService()
        {
            InstantiateRabbitMq();
        }

        public void InstantiateRabbitMq()
        {
            // Connect to the RabbitMQ instance
            var factory = new ConnectionFactory()
            {
                HostName = "localhost"
            };
            _rabbitConnection = factory.CreateConnection();
            var channel = _rabbitConnection.CreateModel();

            // Ensure that the Exchange has been declared within RabbitMQ
            channel.ExchangeDeclare("ReservationExchange", "topic");

            //channel.QueueDeclare("ReservationQueue", true, false, false, null); // This should only be done in the consumer
        }

        public void SendBooking(BookingInput input, string topic, string exchange)
        {
            // Create a channel to RabbitMQ
            var channel = _rabbitConnection.CreateModel();

            // Set up the properties of the message
            var basicProperties = channel.CreateBasicProperties();
            basicProperties.ContentType = "application/json";
            basicProperties.DeliveryMode = 2;

            // Serialize the received input & convert it to a byte array
            var inputToJson = JsonSerializer.Serialize(input);
            var jsonModel = Encoding.UTF8.GetBytes(inputToJson);

            // Send the message
            channel.BasicPublish(exchange, topic, basicProperties, jsonModel);
        }
    }
}