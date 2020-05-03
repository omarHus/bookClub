const express = require('express');
const router  = express.Router();
const Post    = require('../models/Post');
const { ensureAuthenticated } = require('../config/auth');


// Homepage - welcome.js
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated , async (req, res) => {
    const posts = await Post.find({})
    const user  = req.user.name
    res.render('dashboard', {
        posts,
        name: user
        // name: req.user.name
    })
});

module.exports = router;