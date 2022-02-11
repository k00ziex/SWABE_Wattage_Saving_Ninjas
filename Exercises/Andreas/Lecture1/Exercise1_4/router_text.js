const express = require('express');
const app = express();
const router = express.Router();


router.get('/', (req, res) => {
  res.end('Hello Express.js (From /text)')
});
router.post('/', (req, res) => {
    res.end(req.body)
})

module.exports = router;