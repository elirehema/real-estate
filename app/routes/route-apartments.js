let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/ControllerApartments');
router.route('/apartments')
    .get(Controller.getAllApartments)
    .post(auths, Controller.createNewApartment);
router.route('/apartments/:apartmentId')
    .get(Controller.getAllApartmentById)
    .put(auths, Controller.updateApartmentById)
    .patch(auths, Controller.updateApartmentById);
module.exports = router;