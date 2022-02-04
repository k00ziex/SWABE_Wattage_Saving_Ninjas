const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use('/json', require('./jsonrouter'));
app.use("/", require("./indexrouter"));


app.listen(port, _ => {
  console.debug(`Server started and running on port ${port}`);
});