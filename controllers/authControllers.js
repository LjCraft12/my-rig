const moment = require('moment'),
    Post = require('../models/userPost');


const {pages} = require('../locales/text'),
    User = require('../models/userModel'),
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
    const joined = moment().format('MMMM Do YYYY, h:mm');
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
    const logoutTime = moment().format('MMMM Do YYYY, h:mm');
    const username = req.session.user.username;
    User.findOne({username: username})
        .then(user => {
            user.lastLogin = logoutTime;
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
                posted: moment().format('MMMM Do YYYY, h:mm')
            });
            console.log(`Here is your new post ${post}`);
            return post.save();
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(`No user logged in found with that username ${err}`);
        });

};