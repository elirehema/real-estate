UserAuth = require('../Schemas/UserAuthSchema')
var sess;
exports.index = function (req, res) {
    UserAuth.find({}).select("-password")
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "User retrieved successfully",
                data: response
            });
        });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new UserAuth();
    user.email = req.body.email;
    user.password = req.body.password;

    // save the user and check for errors
    user.save(function (err, user_auths) {
        if (err) {
            return res.json({
                status: res.statusCode,
                error: err.message
            });
        }
        var hour = 3600000;
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour;
        sess = req.session;
        var tokenId = jwt.sign({
            userId: user_auths._id
        }, config.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.json({
            status: res.statusCode,
            session: sess,
            message: 'Registration Success',
            data: {id: user_auths._id, name: user_auths.name, email: user_auths.email},
            accessToken: tokenId
        });

    });
};
// Handle view user info
exports.view = async function (req, res) {
    await UserAuth.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.error('There was an error reading the file!', err);
        }
        if (user != null) {
            // test a matching password
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (req.body.password, isMatch) {
                    var hour = 3600000;
                    req.session.cookie.expires = new Date(Date.now() + hour)
                    req.session.cookie.maxAge = hour;
                    sess = req.session;
                    var tokenId = jwt.sign({
                        userId: user._id
                    }, config.TOKEN_SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.json({
                        auth: true,
                        status: res.statusCode,
                        session: sess,
                        message: 'Login Success',
                        user: {id: user._id, name: user.name, email: user.email},
                        accessToken: tokenId
                    }); // -> Password123: true
                } else {
                    res.send('Wrong Username or Password');
                }
            });
        } else {
            res.json({
                auth: false,
                status: res.statusCode,
                message: 'Email ' + req.body.email + '  Not Found',
                accessToken: null
            })
        }
    });


};
// Handle update user info
exports.update = async function (req, res) {
    await UserAuth.findById(req.params.id, function (err, user_auths) {
        if (err) {
            return res.json({
                status: res.statusCode,
                error: err.message
            });
        }

        user_auths.email = req.body.email;
        user_auths.password = req.body.password;
        // save the user and check for errors
        user_auths.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: res.statusCode,
                message: 'User Info updated',
                data: user_auths
            });
        });

    });
};
// Handle delete user
exports.delete = async function (req, res) {
    await UserAuth.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'User deleted'
        });
    });
};

exports.logout = (req, res) => {
    if (req.session.user && req.cookies.id) {
        res.clearCookie('user_sis');
        res.redirect('/');
        res.status(200).send({
            auth: false,
            token: null
        });
    } else {
        res.redirect('/');
    }
};
