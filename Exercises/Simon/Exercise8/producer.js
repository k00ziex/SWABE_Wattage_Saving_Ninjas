var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1
        }

        var queue = 'reservations';
        var msg = 'Initializing reservation queue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.prefetch(1);

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[X] Sent: %s", msg)
        
    })
})