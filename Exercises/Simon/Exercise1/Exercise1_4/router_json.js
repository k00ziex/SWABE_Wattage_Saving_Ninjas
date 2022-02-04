const express = require('express');
const router_json = express.Router();

router_text.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    res.send('Hello from json router!');
});


module.exports = router_json;

