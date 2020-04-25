const express                     = require('express');
const { check, validationResult } = require('express-validator');
const router                      = express.Router();

// req = object full of info coming in
// res = object full of methods for sending data back to user
router.get('/', (req, res) => {
    res.render('form', { title: 'Corona Book Club Login' });
  });
  
router.post('/',
[
    // Validate user input: make sure it is filled
    // But there are other validators you can use
    check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
    check('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
],
(req, res) => {
    // See if validation failed or not
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        res.send('Thank you for your registration!');
    } else {
        res.render('form', {
            title : 'Registration form',
            errors: errors.array(),
            data  : req.body,
        });
    }

    console.log(req.body);
    res.render('form', { title: 'Registration form' });
});

module.exports = router;