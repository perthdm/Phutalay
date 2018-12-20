const bcrypt = require('bcryptjs');
const userDao = require('../database/UserDao');
const Alert = require('../service/AlertService');


function checkUserExist(user) {
    if (user) {
        return true;
    } else {
        return false;
    }
}

function checkPassword(password, newPassword) {
    if(password == newPassword){
        return true
    }
    return false
}

module.exports = {
    displayLogin:async(req,res)=>{
        res.render('Login');
    },
    login:async (req, res) =>{
        var username = req.body.username;
        var password = req.body.password;
        var user = await userDao.getUser(username);
        var userCheck = checkUserExist(user);

        if (userCheck) {
            var passwordCheck =  checkPassword(user.password, password);
            if (passwordCheck) {
              
                req.session.username = user.username;
                req.session.firstname = user.firstname;
                req.session.lastname = user.lastname;

                console.log("{" + req.session.username + "} : Login Success ");
                console.log("{" + req.session.firstname +" "+ req.session.lastname +"} : Login Success ");
    
                res.redirect('/reservation');
               
            } else {
                Alert.displayAlert(res,"Error","Password ไม่ถูกต้อง กรุณากรอกใหม่","error","/");
              
                // res.json({
                //     status : "false",
                //     data : "Password isn't correct"
                // })
                console.log("Password isn't correct");
            }
        } else {
            Alert.displayAlert(res,"Error","ไม่พบ Username นี้ในระบบ กรุณากรอกใหม่","error","/");
            // res.json({
            //     status : "false",
            //     data : "user not found"
            // })
            console.log("username not found");
        }

    }
}