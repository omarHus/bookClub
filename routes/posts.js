const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const passport = require('passport');

// User model
const Post = require('../models/Post');

// New Post Handle
router.post('/dashboard', (req, res) => {
    const { user, title, author, review } = req.body;
    let errors = [];

    // check required fields
    if(!user|| !title || !author|| !review) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // if field is missing go back to form
    if(errors.length > 0) {
        res.render('dashboard', {
           errors,
           user,
           title,
           author,
           review 
        });
    } else {
        // Validation pass
        Post.findOne({ title: title })
            .then(post => {
                if(post) {
                    // post exists
                    errors.push({ msg: 'This book has already been reviewed' });
                    res.render('dashboard', {
                        errors,
                        user,
                        title,
                        author,
                        review 
                    });
                } else {
                    const newPost = new Post({
                        user,
                        title,
                        author,
                        review 
                    });

                    // save user
                    newPost.save()
                        .then(post => {
                            req.flash('success_msg', 'Your review has been posted!');
                            res.redirect('/dashboard');
                        })
                        .catch(err => console.log(err));
                   

                }
            });
    }
});


module.exports = router;