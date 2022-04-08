using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace BookingVisualizer
{
    class EmailSenderDummy
    {
        private const string FileName = "EmailLog.txt";
        public async Task<bool> SendEmail(Models.Reservation reservation)
        {
            try
            {
                var reservationJson = JsonSerializer.Serialize(reservation);

                using (StreamWriter file = new(FileName, append: true))
                {
                    Console.WriteLine("Writing reservation to file:\n" + reservationJson);
                    await file.WriteLineAsync(reservationJson);
                }
                return true;
            }
            catch(Exception e)
            {
                Console.WriteLine("Exception caught:\n" + e.Message);
                return false;
            }
        }
    }
}
