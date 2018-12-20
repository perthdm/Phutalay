const express = require('express');
const router = express.Router();
const LoginService = require('../service/LoginService');
const LogoutService = require('../service/LogoutService');
const RegisterService = require('../service/RegisterService');
const middleAuth = require('../middleware/auth');

router.route('/').get(LoginService.displayLogin);
router.route('/login').post(LoginService.login);
router.route('/logout').get(middleAuth.checkLogin,LogoutService.logout);
router.route('/register').get(middleAuth.checkLogin,RegisterService.displayRegister);
router.route('/register').post(middleAuth.checkLogin,RegisterService.register);


module.exports = router;