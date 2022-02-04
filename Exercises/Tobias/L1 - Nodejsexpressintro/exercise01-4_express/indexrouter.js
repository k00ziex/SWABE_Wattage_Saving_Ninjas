const express = require('express');

const indexrouter = express.Router();

indexrouter.get("/", (req, res) => {
    console.debug("Received GET on indexrouter");
    res.setHeader('content-type', 'text/plain');
    res.send("Hello There");
  });
  
indexrouter.post("/", (req, res) => {
    console.debug(`Received POST on index with data:\n${req.body}`);
    res.setHeader('content-type', 'text/plain');
    res.send("You sent me:\n" + req.body);
  });

module.exports = indexrouter;