const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.text());

router.get('/json', (req, res) => {
    res.json({
      'message': 'Hello, Express.js (From /json)'
    });
  });
router.post('/json', (req, res) => {
    res.json({
        'message': req.body.message
    })
})

module.exports = router;