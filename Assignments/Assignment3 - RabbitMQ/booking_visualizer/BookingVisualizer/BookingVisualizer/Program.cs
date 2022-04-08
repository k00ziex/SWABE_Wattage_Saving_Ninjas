using System;
using System.IO;
using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace BookingVisualizer
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Booking Visualizer Started.");

            const string hostName = "localhost";
            const string exchangeName = "ConfirmationExchange";
            const string exchangeType = "topic";
            const string queueName = "ConfirmationQueue";
            const string routingKey = "hotel.room.confirmation.topic"; // TODO

            var emailSender = new EmailSenderDummy();

            var factory = new ConnectionFactory() { HostName = hostName };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                //channel.ExchangeDeclare(exchangeName, exchangeType); // Producer creates exchange, consumer creates queue. 
                channel.QueueDeclare(queueName, true, false, false);
                channel.QueueBind(queueName, exchangeName, routingKey);
                channel.BasicQos(0,1, false); // 0 is prefetch window size, 1 is amount of messages prefetched, false is "global setting"
                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += async (model, eventArgs) =>
                {
                    Console.WriteLine("***********************************************");
                    try
                    {
                        var body = eventArgs.Body.ToArray();
                        var message = Encoding.UTF8.GetString(body);
                        Console.WriteLine("Received Message:\n" + message);
                        var reservation = JsonSerializer.Deserialize<Models.Reservation>(message);
                        Console.WriteLine($"Reservation received:\n{JsonSerializer.Serialize(reservation)}");

                        // Email 
                        await emailSender.SendEmail(reservation);

                        channel.BasicAck(eventArgs.DeliveryTag, false); // ACK to signal we are done. 

                    }
                    catch (Exception e)
                    {
                        channel.BasicNack(eventArgs.DeliveryTag, false, false);
                        Console.WriteLine("Oh no email saving went wrong");
                        Console.WriteLine(e.Message);
                    }
                    finally
                    {
                        Console.WriteLine("***********************************************");
                    }
                };

                channel.BasicConsume(queue: queueName,
                                     autoAck: false, // We turn off AutoAcking - because we need to ACK only when successfully sent email
                                     consumer: consumer);
                Console.WriteLine("Press enter to stop");
                Console.ReadLine();
            }

        }
    }
}
