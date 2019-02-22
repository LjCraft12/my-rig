const {pages} = require('../locales/text'),
    Post = require('../models/userPost'),
    User = require('../models/userModel');


exports.getIndex = (req, res) => {
    Post.find()
        .then(post => {
            res.render('user/index', {
                pageTitle: pages.home,
                isAuthenticated: req.session.isLoggedIn,
                path: '/',
                post: post
            })
        })
        .catch(err => {
            console.log(`An error has occurred while fetching post please try again ${err}`)
        })
};

// exports.getSearch = (req, res, next) => {
//     res.render('user/search');
// };

exports.postSearch = (req, res, next) => {
    const search = req.body.search;
    console.log(`Here is your search parameters ${search}`);
    User.findOne({username: search})
        .then(user => {
            if (!user) {
                console.log(user);
                return res.redirect('user/index');
            }
            Post.find({userId: user._id})
                .then(userPost => {
                    res.render('user/search', {
                        pageTitle: pages.search,
                        isAuthenticated: req.session.isLoggedIn,
                        path: '/search',
                        post: userPost,
                        query: search
                    })

                })
                .catch(err => {
                    console.log(`Error finding post for the queried user ${err}`);
                })
        })
        .catch(err => {
            console.log(`Error no user found matching that search`)
        })
};