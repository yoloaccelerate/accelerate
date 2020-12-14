/**
 * @description Controller for updating city details.
 */

const countryModel = require('../../model/countryModel');


exports.updateCity = (req, res) => {
    countryModel.find({ name: req.body.name }, (err, city) => {
        const arr = city[0].cities;
        let registeredCity = req.body.city;
        if (err) {
            res.status(400).json(err);
        }
        else {
            let flag=0;
            for(data of arr){
                if(data.toLowerCase() == registeredCity.toLowerCase()){
                    flag=1;
                }
            }
            if(flag==0){
                countryModel.findOneAndUpdate({ name: req.body.name }, {
                    $push: {
                        cities: req.body.city
                    }
                }, (error, updatedCity) => {
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.status(200).json("City successfully updated.");
                    }
                })
            }
            
        }
    })
}
