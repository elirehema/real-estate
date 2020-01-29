// address-routes.js
// Initialize express router
let router = require('express').Router();
// Import contact controller
var AuthController = require('../controllers/AuthController');
// Contact routes
router.route('/auth')
    .get(AuthController.index)
    .post(AuthController.new);
router.route('/auth/:id')
    .patch(AuthController.update)
    .put(AuthController.update)
    .delete(AuthController.delete);
router.route('/auth/login')
    .post(AuthController.view);
router.route('/auth/logout')
    .get(AuthController.logout);
// Export API routes
module.exports = router;