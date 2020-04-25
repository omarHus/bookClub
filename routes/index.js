const express = require('express');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('It works!');
// });

router.get('/', (req, res) => {
    res.render('form', { title: 'Corona Book Clun Login' });
  });

module.exports = router;