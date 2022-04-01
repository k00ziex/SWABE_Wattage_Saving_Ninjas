using System.Text;
using System.Text.Json;
using ExternalBookingClient.Models;
using RabbitMQ.Client;

namespace ExternalBookingClient
{
    public class RabbitMqService : IRabbitMqService
    {
        private IConnection _rabbitConnection;
        private IModel _rabbitChannel;
        private IBasicProperties _messageProperties;

        public RabbitMqService()
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

            // Create a channel
            _rabbitChannel = _rabbitConnection.CreateModel();

            // Ensure that the Exchange has been declared within RabbitMQ
            _rabbitChannel.ExchangeDeclare("ReservationExchange", "topic");


            // Set up the properties of the message
            _messageProperties = _rabbitChannel.CreateBasicProperties();
            _messageProperties.ContentType = "application/json";
            _messageProperties.DeliveryMode = 2;

            //channel.QueueDeclare("ReservationQueue", true, false, false, null); // This should only be done in the consumer
        }

        public void SendBooking(BookingInput input, string topic, string exchange)
        {
            // Serialize the received input & convert it to a byte array
            var inputToJson = JsonSerializer.Serialize(input);
            var jsonModel = Encoding.UTF8.GetBytes(inputToJson);

            // Send the message
            _rabbitChannel.BasicPublish(exchange, topic, _messageProperties, jsonModel);
        }
    }
}