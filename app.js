// Node imports
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session);


// Custom import
const {server, database, sessionOptions} = require('./utilities/connections'),
    port = server.port,
    mongooseConnection = database.databaseConnectionUrl,
    DB_SESSION_URI = database.mongoDBSession.connect,
    userRoutes = require('./routes/userRoutes'),
    authRoutes = require('./routes/authRoutes'),
    User = require('./models/userModel');

const store = new MongoDBStore({
    uri: DB_SESSION_URI,
    collection: 'sessions'
});

// Setting ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Using Middleware
app.use(bodyParser.urlencoded({extended: false}));

// Pointing to a static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: sessionOptions.secret,
    resave: false,
    saveUninitialized: false,
    store: store
}));

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