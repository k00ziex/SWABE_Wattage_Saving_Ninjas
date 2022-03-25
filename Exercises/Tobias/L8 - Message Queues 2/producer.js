var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function (error0, connection) {
	connection.createChannel(function (error1, channel) {
		let exchange_name = "hotelreservations";
		let exchange_type = "topic";
		let msgs = [
			{
				key: "east",
				data: "Reservation. Name: Tobias Lund. Room: 42",
				handled: false,
			},
			{
				key: "west",
				data: "Reservation. Name: Simon Jensen. Room: 69",
				handled: false,
			},
		];

		// Create queue so that we can have request / reply pattern
		channel.assertQueue(
			"", {
				exclusive: true,
			},
			function (err, q) {
				// Assert exchange
				channel.assertExchange(exchange_name, exchange_type, {
					durable: false,
				});

				// Publish both messages
				msgs.forEach((msg) => {
					console.log(`Sending msg: "${msg.data}" under key: ${msg.key}`);
					channel.publish(exchange_name, msg.key, Buffer.from(msg.data), {
						// Replies to our queue.
						replyTo: q.queue,
						correlationId: msg.key,
					});
					console.log(`Sent msg: "${msg.data}" under key: ${msg.key}`);
				});

				// Await replies.
				channel.consume(q.queue, function (msg) {
					console.log(`>> Received message:
                    Content: ${msg.content.toString()}
                    Correlation ID: ${msg.properties.correlationId}
                    `);

                    
					msgs.forEach((m) => {
						if (msg.properties.correlationId == m.key) {
							m.handled = true;    
                        }
                        
					});
                    if(msgs[0].handled && msgs[1].handled) {
                        console.log(`>> Both messages handled, closing`);
                        connection.close();
                        process.exit(0);
                    }
				});
			}
		);
	});
});
