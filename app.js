// Node imports
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose');

// Custom import
const {server, database} = require('./utilities/connections'),
    port = server.port,
    mongooseConnection = database.databaseConnectionUrl,
    userRoutes = require('./routes/userRoutes');


// Setting ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Pointing to a static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Using Middleware
app.use(bodyParser.urlencoded({extended: false}));

// Routing
app.use(userRoutes);


// Database and server connection
mongoose.connect(mongooseConnection)
    .then(() => {
        app.listen(port, (err) => {
            if (!err) {
                console.log(`Connection Started On Port ${port}`);
            } else {
                console.log(`Connection Could Not Be Established on port ${port}`);
            }
        });
    })
    .catch(err => {
        console.log(`An error has occurred with the error of ${err}`);
    });