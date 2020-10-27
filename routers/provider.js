/**
 * @description Express router for provider specifc data.
 * @author Jithin Zacharia
 */

const router = require('express').Router();
const  getProviderController = require('../controllers/provider/getProvidersController');
const getProviderDetailsController = require('../controllers/provider/getProviderDetailsController')
JWTCertifier = require('../helpers/JWTCertifier');

router.get('/all', getProviderController.getAllProvider);
router.get('/pro/login',JWTCertifier.verifyJWT,getProviderDetailsController.getProviderDetail)
router.get('/:partnerId',getProviderDetailsController.getProviderDetails)
router.put('/update/service/:pid',getProviderDetailsController.updateProviderService)
router.put('/update/expertise/:pid',getProviderDetailsController.updateProviderExpertise)
module.exports = router;
