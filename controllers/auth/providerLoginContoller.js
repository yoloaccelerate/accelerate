/**
 * @description Controller for provider login
 * @author Jithin Zacharia
 */

const providerModel = require('../../model/providerModel'),
    JWTCertifier = require('../../helpers/JWTCertifier'),
    passwordValidator = require('../../helpers/passwordValidations');

exports.partnerLogin = (req, res) => {
    providerModel.find({email: req.body.email}, (err, user)=> {
        if(err) {
            res.status(400).json(err);
        } else {
            if(!user.length) {
                res.status(400).json("User does not exists. Please register to continue");
            } else if(passwordValidator.comparePassword(
                req.body.password,
                user[0].password
            ) === false) {
                res.status(401).json("Passwords does not match. Please try again later.");
            } else {
                let token = JWTCertifier.generateJWT(
                    user[0].email,
                    user[0].fullName,
                    2
                );
<<<<<<< HEAD
               
=======
                // console.log(48,user)
>>>>>>> a99d4e44db915ab24bd957a18280f4c4cbc5e7d1
                res.status(200).json({
                   token,
                    status: true,
                    partnerId:user[0].partnerId,
                    name:user[0].fullName
                });
            }
        }
    })
}