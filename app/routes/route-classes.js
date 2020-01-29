let router = require('express').Router();
const auth = require('../middleware/auth');
var Controller = require('../controllers/ControllerClassess');

router.route('/classes')
    .get(Controller.getAllClasses)
    .post(auth, Controller.createNewClass)
router.route('/classes/:classId')
    .get(Controller.getClassById)
    .patch(auth,Controller.updateClassById)
    .put(auth, Controller.updateClassById)
    .delete(auth,Controller.deleteClassById)


module.exports = router