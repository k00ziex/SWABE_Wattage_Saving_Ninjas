const express = require('express');
const app = express();
const port = 3000;

app.use('/api/json', require('./router_json'));
app.use('/api/text', require('./router_text'));

app.get('/index', (req, res) => {
  res.send('Hello from index')
})


app.listen(port, _ => {
  console.debug(`Server running Express.js on port ${port}`)
})