// route-users.js
// Initialize express router

let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/UsersController');
// Contact routes
router.route('/users')
    .get( Controller.getAllUsers);


router.route('/users/:userId')
    .post(auths,Controller.createNewUser)
    .get(Controller.getUserById)
    .patch(auths,Controller.updateCurrentUser)
    .put(auths,Controller.updateCurrentUser)
    .delete(auths,Controller.deleteUserById);
// Export API routes
module.exports = router;