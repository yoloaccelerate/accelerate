/**
 * @fileoverview Controller for getting all the providers
 * @author Jithin Zacharia
 */

const provideModel = require('../../model/providerModel');
JWTCertifier = require('../../helpers/JWTCertifier');

exports.getProviderDetails = (req, res) => {
    
    provideModel.findOne({partnerId:req.params.partnerId  }, (err, providers)=> {
        if(err) {
            res.status(400).json(err);
        } else {
            console.log(providers,req.params.partnerId,"yolo fetching partner id")
            res.status(200).json(providers);
        }
    })
}
exports.getProviderDetail = (req, res) => {
    console.log(22,req.headers['x-api-key'])
    JWTCertifier.getTokenDecoded(req.headers['x-api-key']).then(user=>{
        provideModel.find({email: user.email}, (error, docs)=> {
            if(error) {
                res.status(400).json(error)
            } else {
                console.log(docs.partnerId,'11')
                res.status(200).json(docs.partnerId);
            }
        })
    })   
}

