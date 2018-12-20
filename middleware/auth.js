module.exports = {
    checkLogin: (req, res, next) => {
        if (req.session.username == undefined) {
            res.redirect('/');
        } else {
            next();
        }
    }
};