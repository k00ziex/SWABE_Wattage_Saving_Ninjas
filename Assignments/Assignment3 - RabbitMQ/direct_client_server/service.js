import amqp from 'amqplib/callback_api.js';

const conn_url = 'amqp://localhost';

let ampq_channel = null;
amqp.connect(conn_url, function(error0, connection) {
    if(error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }

        ampq_channel = channel;
        // const queue = 'ReservationQueue';
        // const exchange_name = 'ReservationExchange';
        // const exchange_type = 'topic';

        // channel.assertExchange(exchange_name, exchange_type, {
        //     durable: false
        // });

        // channel.assertQueue(queue,{
        //     durable: false
        // });

        
        
    });

});

export const publish_msg = async(exhange, key, data) => {
    
    ampq_channel.publish(exhange, key, Buffer.from(JSON.stringify(data)), {
        persistent: true
    });
}

process.on('exit', (code) => {
    ampq_channel.close();
    console.log('Closing RabbitMQ Connection')
})