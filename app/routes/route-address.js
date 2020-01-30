// route-address.js
// Initialize express router

let router = require('express').Router();
// Initialize express router
const auth = require('../middleware/auth');
// Import contact controller
var Controller = require('../controllers/ControllerAddresses');
// Contact routes
router.route('/address')
    .get(Controller.getAllAddresses);
router.route('/address/:addressId')
    .get(Controller.getAddressesById)
    .patch(auth, Controller.updateAddressByAddressId)
    .delete(auth, Controller.deleteAddressByAddressId);
router.route('/address/user/:userId')
    .post(auth, Controller.addNewAddressByUserId)
    .put(auth, Controller.updateAddressByUserId)
    .delete(auth, Controller.deleteAddressByUserId);
// Export API routes
module.exports = router;