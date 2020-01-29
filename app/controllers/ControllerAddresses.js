const Schemas = require('../Schemas/AddressSchema');
const UserSchema = require('../Schemas/UserSchema');

exports.getAllAddresses = async function (req, res) {
    await Schemas.find({})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
exports.getAddressesById = async function (req, res) {
    await Schemas.findOne({_id: req.params.addressId})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            return res.json({
                status: res.statusCode,
                size: response.answerComments.length,
                message: "Retrieved successfully",
                data: response
            });
        });
};
exports.getAddressesByUserId = async function (req, res) {
    await UserSchema.findOne({_id: req.params.userId}).select('address')
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Retrieved successfully",
                data: response
            });
        })
};
exports.addNewAddressByUserId = async function (req, res) {
    await UserSchema.findOne({_id: req.params.userId}).select("address")
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            //return res.json(response.address[0])
            var address = new Schemas();
            address._id = response.address[0];
            address.lineOne = req.body.lineone;
            address.lineTwo = req.body.linetwo;
            address.homeNumber = req.body.homeaddress;
            address.city = req.body.city;
            address.postalCode = req.body.postalcode;
            address.state = req.body.state;
            address.email = req.body.email;
            address.aboutMe = req.body.about;
            address.save(function (err) {
                if (err) {
                    return res.json({status: res.statusCode, error: err.message});
                }
                res.json({
                    status: res.statusCode,
                    message: 'New User created succesfully!',
                    data: address
                });
            });


        });


};
exports.updateAddressByAddressId = async function (req, res) {
    await Schemas.findById(req.params.addressId, function (error, response) {
        if (error) {
            return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            })
        }
        var address = new Schemas();
        address.lineOne = req.body.lineone;
        address.lineTwo = req.body.linetwo;
        address.homeNumber = req.body.homeaddress;
        address.city = req.body.city;
        address.postalCode = req.body.postalcode;
        address.state = req.body.state;
        address.email = req.body.email;
        address.aboutMe = req.body.about;
        address.save(function (err) {
            if (err) {
                return res.json({status: res.statusCode, error: err.message});
            }
            res.json({
                status: res.statusCode,
                message: 'New User created succesfully!',
                data: address
            });
        });


    })
};
exports.updateAddressByUserId = async function (req, res) {
    await UserSchema.findOne({_id: req.params.userId}).select("address")
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            var addressId = response.address[0];
            Schemas.findById(addressId, function (error, response) {
                if (error) {
                    return res.json({
                        message: error.message,
                        name: error.name,
                        kind: error.kind,
                        path: error.path,
                        reason: error.reason,
                        model: error.model
                    })
                }
                var address = new Schemas();
                address.lineOne = req.body.lineone;
                address.lineTwo = req.body.linetwo;
                address.homeNumber = req.body.homeaddress;
                address.city = req.body.city;
                address.postalCode = req.body.postalcode;
                address.state = req.body.state;
                address.email = req.body.email;
                address.aboutMe = req.body.about;
                address.save(function (err) {
                    if (err) {
                        return res.json({status: res.statusCode, error: err.message});
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'New User created succesfully!',
                        data: address
                    });
                });
            })


        });
};
exports.deleteAddressByAddressId = async function (req, res) {
    await Schemas.findOneAndRemove({_id: req.params.addressId})
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
exports.deleteAddressByUserId = async function (req, res) {

};


