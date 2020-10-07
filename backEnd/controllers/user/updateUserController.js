/**
 * @description Controller for updating user details.
 * @author Jithin Zacharia
 */

const userModel = require('../../model/userModel');
const objectId =require('mongodb').ObjectId;

exports.updateUser = (req, res) => {
    userModel.find({"_id": objectId(req.body.id)}, (err, users)=> {
        if(err) {
            res.status(400).json(err);
        } else if(!users.length) {
            res.status(400).json("User not found. Please register to continue");
        }else if(users.length) {
            userModel.find({email: req.body.email}, (err, users1)=> {
                if(err) {
                    res.status(400).json(err);
                } else if(users1.length) {
                    // console.log("hii")
                    res.status(200).json("EMAIL ID already exist");
                }else {
                userModel.findOneAndUpdate({"_id": objectId(req.body.id)}, {$set: {
                email: req.body.email,
                name: req.body.name,
                phone_number: req.body.phone_number,
                // country: req.body.country,
                // photo: req.body.photo
            }}, (error, newUser) => {
                if(error) {
                    res.status(400).json(error);
                } else {
                    console.log(req.body.email);
                    userModel.find({email: req.body.email}, (err, users2)=> {
                        if(users2.length){
                            console.log(users2);
                        }else{
                            console.log("no");
                        }
                    })
                    
                    res.status(200).json("Profile successfully updated.");
                }
            })
        }
    })
    }
    }
    )
}