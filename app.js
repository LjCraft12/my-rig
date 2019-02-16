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
    userRoutes = require('./routes/userRoutes'),
    authRoutes = require('./routes/authRoutes'),
    User = require('./models/userModel');

// Setting ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Using Middleware
app.use(bodyParser.urlencoded({extended: false}));

// Pointing to a static public folder
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('5c68765e95a6011b8c6a654f')
//         .then(user => {
//             console.log('User found');
//             req.user = user;
//             next()
//         })
//         .catch(err => {
//             console.log(`You have an error: ${err}`);
//         })
// });

// Routing
app.use('/admin', authRoutes);
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