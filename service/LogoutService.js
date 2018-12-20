const userDao = require('../database/UserDao');



module.exports = {

    logout:async (req, res) =>{
        req.session.username = undefined;
        req.session.firstname = undefined;
        req.session.lastname = undefined;
        res.redirect('/');
    }
}