var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function (error0, connection) {
	connection.createChannel(function (error1, channel) {
		let exchange_name = "hotelreservations";
		let exchange_type = "topic";
		let key = "west"

		channel.assertExchange(exchange_name, exchange_type, {
			durable: false,
		});

        channel.assertQueue('', {
            exclusive: true,
        }, function(error2, q) {
            console.log(`>> Awaiting messages.`);
            channel.bindQueue(q.queue, exchange_name, key);
            channel.consume(q.queue, function(msg) {
                console.log(">> Received message:");
                console.log(`   ${msg.content.toString()}`);
                console.log(`   With key: ${msg.fields.routingKey}`);

                // Reply ack
                channel.sendToQueue(msg.properties.replyTo, 
                    Buffer.from("I did the work boss"), 
                    {
                        correlationId: msg.fields.routingKey,
                    }
                );

            }, {
                noAck: true,
            });
        });
	});
});
