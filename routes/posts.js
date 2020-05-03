const express  = require('express');
const router   = express.Router();

// User model
const Post = require('../models/Post');

// New Post Handle
router.post('/newPost',(req, res) => {
    const { name, title, author, review } = req.body;
    console.log(name);
    let errors = [];

    // check required fields
    if(!title || !author|| !review) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // if field is missing go back to form
    if(errors.length > 0) {
        res.render('dashboard', {
           errors,
           name,
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
                        name,
                        title,
                        author,
                        review 
                    });
                } else {
                    const newPost = new Post({
                        name,
                        title,
                        author,
                        review 
                    });

                    // save post
                    newPost.save()
                        .then(post => {
                            req.flash('success_msg', 'Your review has been posted!');
                            console.log('you posted a new review');
                            res.redirect('/dashboard');
                        })
                        .catch(err => console.log(err));
                   

                }
            });
    }
});

// // Dashboard
// router.get('/dashboard/newPost' ,(req, res) => 
//     res.render('dashboard', {
//         name: req.user.name
// }));


module.exports = router;