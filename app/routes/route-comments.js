let router = require('express').Router();
const auth = require('../middleware/auth');
var Controller = require('../controllers/ControllerComments');

router.route('/comments')
    .get(Controller.getAllComments);
router.route('/comments/:userId')
    .get(auth, Controller.getCommentsByUserId);
router.route('/comments/:commentId')
    .get(Controller.getCommentsByAnswerId);

module.exports = router;