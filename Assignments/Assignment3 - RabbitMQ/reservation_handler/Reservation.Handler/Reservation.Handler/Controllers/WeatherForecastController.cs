using Microsoft.AspNetCore.Mvc;
using Reservation.Handler.Models;
using Reservation.Handler.RabbitMQ;

namespace Reservation.Handler.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IMessageQueuePublisher _reservationPublisher;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IMessageQueuePublisher reservationPublisher)
        {
            _logger = logger;
            _reservationPublisher = reservationPublisher;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        public async Task SendRequest(Models.Reservation reservationDto)
        {
            _reservationPublisher.Publish(reservationDto, "test.a", "test");
        }
    }
}