// Modules
const express    = require('express');
const path       = require('path');
const routes     = require('./routes/index');
const bodyParser = require('body-parser');

// App setup
const app = express();

// pug Templates
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// styling
app.use(express.static('public'));

// Requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', routes);

module.exports = app;