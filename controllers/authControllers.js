const moment = require('moment'),
    timeFormat = moment().format('MMMM Do YYYY, h:mm'),
    Post = require('../models/userPost'),
    User = require('../models/userModel'),
    Message = require('../models/userMessages');


const {pages} = require('../locales/text'),

    bcrypt = require('bcrypt');

exports.getSignup = (req, res, next) => {
    res.status(200).render('auth/signup', {
        pageTitle: pages.signup,
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postSignUp = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const joined = timeFormat;
    User.findOne({username: username})
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/admin/login');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        email: email,
                        password: hashedPassword,
                        joined: joined
                    });
                    return user.save();
                })
                .then(() => {
                    res.redirect('/admin/login');
                })
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getLogin = (req, res, next) => {
    res.status(200).render('auth/login', {
        pageTitle: pages.login,
        isAuthenticated: req.session.isLoggedIn
    })
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const loginTime = timeFormat;

    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.redirect('/admin/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        user.lastLogin = loginTime;
                        user.save();
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/admin/profile');
                        });
                    }
                    res.redirect('/admin/login');
                })
                .catch(err => {
                    res.redirect('/login');
                });

        })
};

exports.postLogout = (req, res, next) => {
    const logoutTime = timeFormat;
    const username = req.session.user.username;
    User.findOne({username: username})
        .then(user => {
            user.lastLogout = logoutTime;
            user.save();
            req.session.destroy((err) => {
                console.log(err);
                res.redirect('/')
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProfile = (req, res, next) => {
    const username = req.session.user.username;
    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            res.render('auth/profile', {
                pageTitle: pages.profile,
                isAuthenticated: req.session.user,
                user: user
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getMessage = (req, res, next) => {
    const username = req.session.user.username;
    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.redirect('/admin/login')
            }
            Message.find({toUserId: req.session.user._id.toString()})
                .then(userMessages => {
                    res.render('auth/messages', {
                        pageTitle: pages.message,
                        isAuthenticated: req.session.user,
                        messages: userMessages || {},
                        user: user
                    })
                })
                .catch(err => {
                    console.log(`Error could not retrieve the messages for this user please try again ${err}`)
                })
        })
        .catch(err => {
            console.log(`No user found or something went wrong ${err}`)
        })
};

exports.postMessage = (req, res, next) => {
    const messageReceiver = req.body.receiverName;
    const title = req.body.messageTitle;
    const message = req.body.message;
    User.findOne({username: messageReceiver})
        .then(user => {
            if (!user) {
                return res.redirect('/admin/message');
            }
            const messageToUser = new Message({
                fromUserId: req.session.user._id,
                toUserId: user._id,
                title: title,
                messageDescription: message,
                sent: timeFormat
            });
            messageToUser.save();
            return res.redirect('/admin/message')
        })
        .catch(err => {
            console.log(`There was an error when sending ${messageReceiver} their message ${err}`)
        })
};

exports.postUserPost = (req, res, next) => {
    const _id = req.session.user._id;
    const username = req.session.user.username;
    const postTitle = req.body.postTitle;
    const postDescription = req.body.postDescription;
    const imageFile = req.file;
    User.findOne({username: username})
        .then(user => {
            if (!user) {
                res.redirect('/admin/login')
            }
            const post = new Post({
                userId: req.session.user,
                username: username,
                postTitle: postTitle,
                postDescription: postDescription,
                postImage: imageFile,
                posted: timeFormat
            });
            return post.save();
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(`No user logged in found with that username ${err}`);
        });

};