// Modules
const express = require('express');
const path    = require('path');
const routes  = require('./routes/index');

// App setup
const app = express();

// pug Templates
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use('/', routes);

module.exports = app;