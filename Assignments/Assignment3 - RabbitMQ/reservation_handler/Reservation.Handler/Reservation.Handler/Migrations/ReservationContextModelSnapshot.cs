// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Reservation.Handler.DatabaseContext;

#nullable disable

namespace Reservation.Handler.Migrations
{
    [DbContext(typeof(ReservationContext))]
    partial class ReservationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Reservation.Handler.Models.Reservation", b =>
                {
                    b.Property<string>("ReservationId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CheckIn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CheckOut")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HotelId")
                        .HasColumnType("int");

                    b.Property<int>("RoomNo")
                        .HasColumnType("int");

                    b.HasKey("ReservationId");

                    b.ToTable("Reservations");
                });
#pragma warning restore 612, 618
        }
    }
}
