const express = require('express');
const router_text = express.Router();

router_text.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/plain')
    res.send('Hello from text router!')
});

router_text.post('/', (req,res) => {
    
});

module.exports = router_text;