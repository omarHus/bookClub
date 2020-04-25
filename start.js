// Modules
const app      = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');
require('./models/Registration');

// Database connectiong details
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser   : true,
    useUnifiedTopology: true
});
mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log('Connection error: ${err.message}');
    });

// Start server connection
const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});