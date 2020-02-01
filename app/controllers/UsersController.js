// Import User Model
const UserSchema = require('../Schemas/UserSchema');
const Addresses = require('../Schemas/AddressSchema');
const constants = require("../config/Constants");


/**Get all Users in thy system **/
exports.getAllUsers = async function (req, res) {
    await UserSchema.find({})
        .populate({path: "address", model: constants.ADDRESS_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({status: res.statusCode, errror: err.message})
            }
            return res.json({
                status: res.statusCode,
                message: "User retrieved successfully",
                data: response
            });
        });
};
exports.getAllUsersWithoutAddress = async function (req, res) {
    await UserSchema.find({})
        .exec(function (err, response) {
            if (err) {
                return res.json({status: res.statusCode, errror: err.message})
            }
            return res.json({
                status: res.statusCode,
                message: "User retrieved successfully",
                data: response
            });
        });
};
exports.getUserById = async function (req, res) {
    await UserSchema.findOne({_id: req.params.userId})
        .populate({path: "address", model: constants.ADDRESS_COLLECTION})
        .exec(function (err, response) {
            if (err) {
                return res.json({status: res.statusCode, errror: err.message});
            } else if (null == response) {
                return res.json({status: res.statusCode, message: 'No Data available! '});
            } else {
                return res.json({
                    status: res.statusCode,
                    message: 'User details loaded succesfully...',
                    data: response
                });
            }
        });
};

// Handle create user actions
exports.createNewUser = async function (req, res, next) {
    console.log(req.file);
    var address = new Addresses();
    const user = new UserSchema({
        _id: req.params.userId,
        userName: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        thumbNail: req.file.path,
        title: req.body.title,
        jobTitle: req.body.jobtitle,
        fullName: user.getFullName(),
        address: address._id
    });
    // save the user and check for errors
    await user.save(function (err) {
        if (err) {
            return res.json({status: res.statusCode, error: err.message});
        }
        res.json({
            status: res.statusCode,
            message: 'New User created succesfully!',
            data: user
        });
    });
};
// Handle view user info

exports.updateCurrentUser = async function (req, res) {
    console.log(req.file);
    await UserSchema.findById(req.params.userId,

        function (err, user) {
            if (err) {
                return res.json({status: res.statusCode, error: err.message});
            }
            user.username = req.body.username;
            user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
            user.lastName = req.body.lastname;
            user.email = req.body.email;
            user.thumbNail = req.file.path;
            user.title = req.body.title;
            user.jobTitle = req.body.jobtitle;
            user.fullName = user.getFullName();
            // save the user and check for errors
            user.save(function (err) {
                if (err) {
                    return res.json(err);
                }
                return res.json({
                    status: res.statusCode,
                    message: 'User Info updated',
                    data: user
                });
            });

        }
    )
    ;
};
// Handle delete user
exports.deleteUserById = async function (req, res) {
    await UserSchema.findOneAndRemove({_id: req.params.userId})
        .exec(function (err, user) {
            if (err) {
                return res.json(err);
            }
            return res.json({
                status: res.statusCode,
                message: 'User deleted'
            });
        });
};
