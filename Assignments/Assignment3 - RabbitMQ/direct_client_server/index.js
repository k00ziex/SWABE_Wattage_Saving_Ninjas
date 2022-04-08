//Inspiration for the Node server can be found here: https://github.com/pankaj805/medium-08_mq
import express from 'express';
import bodyParser from 'body-parser';
import {operations} from './reservation-router.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/reservation', operations);


app.listen(port, () => {
    console.log(`Server Running 'router' on port ${port}`);
});

process.on('SIGINT', function() {
    console.log('Closing Application');
    process.exit();
})

