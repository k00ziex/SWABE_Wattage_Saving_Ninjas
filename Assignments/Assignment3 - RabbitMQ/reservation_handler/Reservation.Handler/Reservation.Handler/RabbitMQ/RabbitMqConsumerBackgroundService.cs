using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Reservation.Handler.DatabaseContext;
using Reservation.Handler.Models;
using Reservation.Handler.Repositories;
using System.Text;

namespace Reservation.Handler.RabbitMQ
{
    public class RabbitMQConsumerBackgroundService : BackgroundService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly ILogger _logger;
        private readonly IMessageQueuePublisher _messageQueuePublishService;
        private IConnection _connection;
        private IModel _channel;

        public RabbitMQConsumerBackgroundService(IReservationRepository reservationRepository,
            IMessageQueuePublisher messageQueuePublishService,
            ILogger<RabbitMQConsumerBackgroundService> logger)
        {
            _reservationRepository = reservationRepository;
            _logger = logger;
            _messageQueuePublishService = messageQueuePublishService;

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

            //_channel.ExchangeDeclare(Constants.Hotel_Room_Exchange_Name, ExchangeType.Topic, true);
            _channel.QueueDeclare(Constants.Hotel_Room_Queue, false, false, false, null);
            _channel.QueueBind(Constants.Hotel_Room_Queue, Constants.Hotel_Room_Exchange_Name, Constants.Hotel_Room_Topic, null);
            _channel.BasicQos(0, 1, false);
        }

        private async Task HandleReservation(ReservationDto reservation)
        {
            var dbReservation = await _reservationRepository.Insert(reservation);

            if (dbReservation is Models.Reservation)
                _messageQueuePublishService.Publish(dbReservation, Constants.Confirmation_Topic, Constants.Confirmation_Exchange_Name);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
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

                // Ack  
                _channel.BasicAck(ea.DeliveryTag, false);
            };

            _channel.BasicConsume(Constants.Hotel_Room_Queue, false, consumer);

            return Task.CompletedTask;
        }
    }
}
