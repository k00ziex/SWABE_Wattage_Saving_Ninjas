const express = require('express');

const jsonrouter = express.Router();

jsonrouter.get("/", (req, res) => {
    console.debug("Received GET on /json");
    res.json({
        response: "General Kenobi!"
      }
    );
  });
  
jsonrouter.post("/", (req, res) => {
    console.debug("Received POST on /json");
    res.json({
      received: req.body
    })
});

module.exports = jsonrouter;