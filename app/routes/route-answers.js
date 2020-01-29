let router = require('express').Router();
const auth = require('../middleware/auth');
var Controller = require('../controllers/ControllerAnswers');

router.route('/answers')
    .get(Controller.getAllAnswers);
router.route('/answers/:questionId')
    .get(Controller.getAnswersByQuestionId);
router.route('/answer/:answerId')
    .get(Controller.getAnswerByAnswerId);
router.route('/answer/:answerId/votes')
    .get(Controller.getAnswerVoters)
    .put(auth, Controller.upvoteAnswer);
router.route('/answer/:answerId/comments')
    .get(Controller.getAnswerComments)
    .patch(auth, Controller.commentOnQuestionAnswer);
module.exports = router;