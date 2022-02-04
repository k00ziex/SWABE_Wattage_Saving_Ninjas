const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.text())


app.get("/", (req, res) => {
  console.debug("Received GET on index");
  res.setHeader('content-type', 'text/plain');
  res.send("Hello There");
});

app.post("/", (req, res) => {
  console.debug(`Received POST on index with data:\n${req.body}`);
  res.setHeader('content-type', 'text/plain');
  res.send("You sent me:\n" + req.body);
});

app.get("/json", (req, res) => {
  console.debug("Received GET on /json");
  res.json({
      response: "General Kenobi!"
    }
  );
});

app.post("/json", (req, res) => {
  console.debug("Received POST on /json");
  res.json({
    received: req.body
  })
});


app.listen(port, _ => {
  console.debug(`HEJANDYServer started and running on port ${port}`);
});