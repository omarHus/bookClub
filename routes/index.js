const express                     = require('express');
const mongoose                    = require('mongoose');
const { check, validationResult } = require('express-validator');
const router                      = express.Router();
require('../models/Registration');
const Registration                = mongoose.model('Registration');

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
        const registration = new Registration(req.body);
        registration.save()
            .then(() => { res.send('Thank you for your registration!'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
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

// list registrations
router.get('/registrations', (req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations });
        })
        .catch(() => { res.send('Sorry! Something went wrong'); });
});

module.exports = router;