const {pages} = require('../locales/text');


exports.getIndex = (req, res) => {
    res.render('index', {
        pageTitle: pages.home
    })
};