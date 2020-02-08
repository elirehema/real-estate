let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/ControllerApartments');
router.route('/apartments')
    .get(Controller.getAllApartmentExcludeRooms)
    .post(auths, Controller.createNewApartment);
router.route('/apartments/all')
    .get(Controller.getAllApartments);
router.route('/apartments/none')
    .get(Controller.getAllApartmentExcludeRooms);
router.route('/apartments/rooms')
    .get(Controller.getAllApartmentsWithOnlyRooms);
router.route('/apartments/costs')
    .get(Controller.getAllApartmentsWithOnlyExtraCosts);
router.route('/apartments/images')
    .get(Controller.getAllApartmentsWithOnlyRoomImages);
router.route('/apartments/:apartmentId')
    .get(Controller.getAllApartmentById)
    .put(auths, Controller.updateApartmentById)
    .patch(auths, Controller.updateApartmentById)
    .delete(auths, Controller.delete);
router.route('/apartments/:apartmentId/rooms')
    .get(Controller.getAllApartmentRooms)
    .post(auths, Controller.addNewRoomInApartment);
router.route('/apartments/:apartmentId/costs')
    .get(Controller.getAllApartmentExtraCosts)
    .post(auths, Controller.addNewCostsInApartment);
router.route('/apartments/:apartmentId/costs/ids')
    .get(Controller.getAllApartmentExtraCostsIds);
router.route('/apartments/:apartmentId/rooms/plain')
    .get(Controller.getAllApartmentRoomsId);

router.route('/costs')
    .get(Controller.getAllCosts);
router.route('/costs/:costId')
    .get(Controller.getCostById)
    .put(auths, Controller.updateCostById)
    .patch(auths, Controller.updateCostById)
    .delete(auths, Controller.deleteCostById);
router.route('/costs/:costId/terms')
    .get(Controller.getTermsByCostId)
    .post(auths, Controller.createTermAndConditionsInCost);

router.route('/terms')
    .get(Controller.getAllTermsAndConditions);
router.route('/terms/:termId')
    .get(Controller.getTermsByTermId)
    .put(auths, Controller.updateTermAndConditionById)
    .patch(auths, Controller.updateTermAndConditionById);
module.exports = router;