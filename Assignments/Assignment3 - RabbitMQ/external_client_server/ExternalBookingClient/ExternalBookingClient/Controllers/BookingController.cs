using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Globalization;
using System.Threading.Tasks;
using ExternalBookingClient.Models;

namespace ExternalBookingClient.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {
        private const string Iso8601Format = "yyyy-MM-ddTHH:mm:ss.fffZ";
        private readonly ILogger<BookingController> _logger;
        private readonly IRabbitMqService _rabbitMqService;

        public BookingController(ILogger<BookingController> logger, IRabbitMqService rabbitService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _rabbitMqService = rabbitService ?? throw new ArgumentNullException(nameof(rabbitService));
        }

        [HttpPost]
        public IActionResult BookHotelRoom(BookingInput inputModel)
        {
            try
            {
                var errorFromInputValidation = ValidateInput(inputModel);

                if (string.IsNullOrEmpty(errorFromInputValidation))
                {
                    _rabbitMqService.SendBooking(inputModel, "hotel.room.reservation.topic", "ReservationExchange");
                }
                else
                {
                    return BadRequest(errorFromInputValidation);
                }

                return Ok("Your booking has been sent for processing in our system. Please check your email for the confirmation of your booking.");
            } 
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500,
                    "A horrible error happened within our system! Please wait a while and try again. If the error persists, please contact customer support.");
            }
        }

        private static string ValidateInput(BookingInput input)
        {
            if (!DateTime.TryParseExact(input.CheckIn, Iso8601Format, CultureInfo.InvariantCulture, DateTimeStyles.None, out var checkInDate))
            {
                var errorMessage = $"{nameof(input.CheckIn)} must be a valid date in accordance with the ISO 8601 standard of 'yyyy-MM-ddTHH:mm:ss.fffZ'.";
                return errorMessage;
            }

            if (!DateTime.TryParseExact(input.CheckOut, Iso8601Format, CultureInfo.InvariantCulture, DateTimeStyles.None, out var checkOutDate))
            {
                var errorMessage = $"{nameof(input.CheckOut)} must be a valid date in accordance with the ISO 8601 standard of 'yyyy-MM-ddTHH:mm:ss.fffZ'.";
                return errorMessage;
            }

            if (DateTime.Compare(checkInDate.Date, checkOutDate.Date) >= 0)
            {
                var errorMessage = $"The {nameof(input.CheckOut)} date must a later date than the {nameof(input.CheckIn)}.";
                return errorMessage;
            }

            if (string.IsNullOrEmpty(input.CustomerAddress))
            {
                var errorMessage = $"{nameof(input.CustomerAddress)} must not be null or empty.";
                return errorMessage;
            }

            if (string.IsNullOrEmpty(input.CustomerEmail))
            {
                var errorMessage = $"{nameof(input.CustomerEmail)} must not be null or empty.";
                return errorMessage;
            }

            if (string.IsNullOrEmpty(input.CustomerName))
            {
                var errorMessage = $"{nameof(input.CustomerName)} must not be null or empty.";
                return errorMessage;
            }

            return "";
        }
    }
}
