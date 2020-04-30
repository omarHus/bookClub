const express = require('express');
const router  = express.Router();

// Homepage - welcome.js
router.get('/', (req, res) => res.render('welcome'));

module.exports = router;