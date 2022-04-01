import reservation from './reservation-router'
const express = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/reservation', reservation);


app.listen(port, () => {
    console.log(`Server Running 'router' on port ${port}`);
});

process.on('SIGINT', function() {
    console.log('Closing Application');
    process.exit();
})

