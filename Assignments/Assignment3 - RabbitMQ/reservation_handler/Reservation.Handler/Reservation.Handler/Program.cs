using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client;
using Reservation.Handler.DatabaseContext;
using Reservation.Handler.RabbitMQ;
using Reservation.Handler.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Depencies
builder.Services.AddDbContext<ReservationContext>(options =>
{
    options.UseSqlServer(@"Server=localhost;Database=reservationdatabase;User Id=sa;password=v({w6.@9B9;Trusted_Connection=False;MultipleActiveResultSets=true;");
});
builder.Services.AddTransient<IReservationRepository, ReservationRepository>();
builder.Services.AddSingleton<IMessageQueuePublisher, RabbitMqPublishService>();
builder.Services.AddHostedService<RabbitMqConsumerBackgroundService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Migrate db at startup
using (var scope = app.Services.CreateScope())
{
    var reservationContext = scope.ServiceProvider.GetRequiredService<ReservationContext>();
    reservationContext.Database.Migrate();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
