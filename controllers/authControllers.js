const {pages} = require('../locales/text'),
    User = require('../models/userModel'),
    bcrypt = require('bcrypt');

exports.getSignup = (req, res, next) => {
    res.status(200).render('auth/signup', {
        pageTitle: pages.signup
    });
};

exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                username: username,
                email: email,
                password: hashedPassword,
            });
            return user.save();
        })
        .then(() => {
            res.redirect('/admin/login')
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLogin = (req, res, next) => {
    res.status(200).render('auth/login', {
        pageTitle: pages.login
    })
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username})
        .then(user => {
            console.log(user);
            if (!user) {
                return res.status(422).render('auth/login')
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        res.redirect('/profile')
                    }
                })
        })
        .catch()
};

// exports.getProfile = (req, res, next) => {
//     const user = req.params.username;
//     User.find({username: user})
//         .then(
//             res.render('/profile')
//         )
// };