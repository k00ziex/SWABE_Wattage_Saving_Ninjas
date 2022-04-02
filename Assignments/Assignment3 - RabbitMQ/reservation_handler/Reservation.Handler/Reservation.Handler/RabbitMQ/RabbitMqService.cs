﻿using RabbitMQ.Client;
using Reservation.Handler.Models;
using System.Text;
using System.Text.Json;

namespace Reservation.Handler.RabbitMQ
{
    public class RabbitMqService : IMessageQueuePublisher
    {
        private IConnection _rabbitConnection;
        private IModel _rabbitChannel;
        private IBasicProperties _messageProperties;

        public RabbitMqService()
        {
            Init();
        }

        public void Init()
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
            _rabbitChannel.ExchangeDeclare("test", ExchangeType.Topic, true);


            // Set up the properties of the message
            _messageProperties = _rabbitChannel.CreateBasicProperties();
            _messageProperties.ContentType = "application/json";
            _messageProperties.DeliveryMode = 2;

        }

        public void Publish(Models.Reservation reservation, string topic, string exchange)
        {
            var inputToJson = JsonSerializer.Serialize(reservation);
            var jsonModel = Encoding.UTF8.GetBytes(inputToJson);

            _rabbitChannel.BasicPublish(exchange, topic, _messageProperties, jsonModel);
        }
    }
}
