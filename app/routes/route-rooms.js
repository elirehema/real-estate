let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/ControllerRooms');
router.route('/rooms')
.get(Controller.getAllRooms);

router.route('/rooms/:roomId')
.get(Controller.getRoomById)
.patch(auths, Controller.updateRoomById);

module.exports = router;