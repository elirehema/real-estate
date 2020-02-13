// route-users.js
// Initialize express router

let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/UsersController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {

    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
        cb(null, req.params.userId + '.'+extension)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimeyype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
// Contact routes
router.route('/users')
    .get(Controller.getAllUsers);
router.route('/users/plain')
    .get(Controller.getAllUsersWithoutAddress);

router.route('/users/:userId')
    .post(auths, Controller.createNewUser)
    .get(Controller.getUserById)
    .patch(auths, Controller.updateCurrentUser)
    .put(auths, Controller.updateCurrentUser)
    .delete(auths, Controller.deleteUserById);
// Export API routes
module.exports = router;