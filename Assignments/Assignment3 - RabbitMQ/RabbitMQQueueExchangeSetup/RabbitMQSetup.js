var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function (error0, connection) {
    if(error0){
        throw error0;
    }
    console.log("Connected");
	connection.createChannel(function (error1, channel) {
        if(error1){
            throw error1;
        }

        console.log("Created Channel");
		const reservation_exchange = "ReservationExchange";
        const reservation_queue = "ReservationQueue";
        const reservation_queue_routingkey = "hotel.room.reservation.topic";

        const confirmation_exchange = "ConfirmationExchange";
        const confirmation_queue = "ConfirmationQueue";
        const confirmation_queue_routingkey = "hotel.room.confirmation.topic";

        const exchange_type_topic = "topic";
        
        // Exchange and queues are durable and not deleted automatically.
		const exchange_options = {
            durable: true,
            autoDelete: false,
        }
        const queue_options = {
            durable: true,
            autoDelete: false,
        }

        console.log("Creating exchanges");
        // Create exchanges
        channel.assertExchange(reservation_exchange, exchange_type_topic, exchange_options);
        channel.assertExchange(confirmation_exchange, exchange_type_topic, exchange_options);

        console.log("Creating queues");
        // Create queues
        channel.assertQueue(reservation_queue, queue_options);
        channel.assertQueue(confirmation_queue, queue_options);

        console.log("Binding queues");
        // Bind queues to exchanges. 
        channel.bindQueue(confirmation_queue, confirmation_exchange, confirmation_queue_routingkey);
        channel.bindQueue(reservation_queue, reservation_exchange, reservation_queue_routingkey)
        console.log("Done");
        //process.exit(0);
	});
});
