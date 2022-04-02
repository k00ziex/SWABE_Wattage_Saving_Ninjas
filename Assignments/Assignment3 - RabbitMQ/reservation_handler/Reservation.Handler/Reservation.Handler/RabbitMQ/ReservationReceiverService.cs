﻿using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Reservation.Handler.DatabaseContext;
using Reservation.Handler.Models;
using Reservation.Handler.Repositories;
using System.Text;

namespace Reservation.Handler.RabbitMQ
{
    public class ReservationReceiverService : BackgroundService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly ILogger _logger;
        private IConnection _connection;
        private IModel _channel;

        public ReservationReceiverService(IReservationRepository reservationRepository, 
            ILogger<ReservationReceiverService> logger)
        {
            _reservationRepository = reservationRepository;
            _logger = logger;

            Init();
        }

        private void Init()
        {
            var factory = new ConnectionFactory { 
                HostName = "localhost" 
            };

            // create connection  
            _connection = factory.CreateConnection();

            // create channel  
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare("test", "topic", true);
            _channel.QueueDeclare("test.queue.log", false, false, false, null);
            _channel.QueueBind("test.queue.log", "test", "test.*", null);
            _channel.BasicQos(0, 1, false);
        }

        private async Task HandleReservation(ReservationDto reservation)
        {
            var dbReservation = await _reservationRepository.Insert(reservation);


        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += async (ch, ea) =>
            {
                // received message  
                var content = System.Text.Encoding.UTF8.GetString(ea.Body.ToArray());
                try
                {
                    var reservationDto = JsonConvert.DeserializeObject<ReservationDto>(content);
                    await HandleReservation(reservationDto);
                }
                catch (Exception e)
                {
                    _logger.LogInformation("Could not convert {content} to ReservationDto object - Got the following error message {error}", content, e.Message);
                }

                // handle the received message  
                _logger.LogInformation(content);
                _channel.BasicAck(ea.DeliveryTag, false);
            };

            _channel.BasicConsume("test.queue.log", false, consumer);
        }
    }
}
