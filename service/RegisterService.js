const userDao = require('../database/UserDao');
const User = require('../models/User');
var express = require('express')
const Alert = require('../service/AlertService');
const checkUserExist = (userFind)=> {
    if (userFind) {
        return true;
    } else {
        return false;
    }
}


function checkStrongPassword(password){
    if (password.length >= 8 ) {
        return true;
    } else {
        return false;
    }
}

function checkMatchPassword(password , confirmPassword){
    if (password == confirmPassword) {
        return true;
    } else {
        return false;
    }
}



module.exports = {
    displayRegister:async(req, res)=>{
        res.render('Register');
    },
    register:async(req, res) =>{
        console.log(req.body);
        var username = req.body.username  
        var password = req.body.password 
        var confirmPassword = req.body.confirmPassword
        var userFind = await userDao.getUser(username);

        var user = new User({
			username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        // let user = await userDao.getAll();
   
        
        var checkUser = checkUserExist(userFind);
        var checkMatch = checkMatchPassword(password , confirmPassword);
        var checkStrong = checkStrongPassword(password);
        
        
        if (checkUser) {
            // res.json({status : "false" , message:"username is already to use"})
            Alert.displayAlert(res,"Error","Username นี้มีอยู่ในระบบแล้ว กรุณากรอกใหม่","error","/register")
            
          
        }
        else{
           if(checkStrong){
                if(checkMatch){
                    userDao.insert(user);
                    Alert.displayAlert(res,"Success","เพิ่มสมาชิกสำเร็จ","seccess","/reservation")
                }else{
                    // res.json({status : "false", message:"Password mismatch "})
                     Alert.displayAlert(res,"Error","Password ไม่ตรงกัน","error","/register")
                }
           }
           else{
            // res.json({status : "false", message:"Password less than 8 character"})
            Alert.displayAlert(res,"Error","กรุณากรอก Password มากกว่าเท่ากับ 8 ตัวอักษร","error","/register")
           }
        }      
    }
}



