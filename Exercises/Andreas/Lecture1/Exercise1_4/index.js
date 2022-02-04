const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.text());


app.get('/', (req, res) => {
  res.end('Hello Express.js')
});
app.post('/', (req, res) => {
    res.end(req.body)
})
app.get('/json', (req, res) => {
  res.json({
    'message': 'Hello, Express.js'
  });
});
app.post('/json', (req, res) => {
    res.json({
        'message': req.body.message
    })
})

app.listen(port, _ => {
  console.debug(`Server running Express.js on port ${port}`)
})