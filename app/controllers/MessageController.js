// Import Message Model
Message = require('../Schemas/messagesModel');

exports.index = async function (req, res) {
    await Message.get(function (err, message) {
        if (err) {
            res.json({
                status: res.statusCode,
                message: err,
            });
        }

        res.json({
            status: res.statusCode,
            message: "Message retrieved successfully",
            data: message
        });
    });
};
// Handle create message actions
exports.new = async function (req, res) {

    var parent = new Message();
    parent.period = parent.getDate();
    var childrens = {name: req.body.name, message: req.body.message, sentOn: parent.getCurrentTime()};

    await Message.findOneAndUpdate({period: parent.getDate()}, {$push: {children: childrens}},{safe: true, upsert: true},
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                res.json({
                    status: res.statusCode,
                    message: ''
                })
            }
        });
};
// Handle view Message info
exports.view = async function (req, res) {
   await Message.findById(req.params.message_id, function (err, message) {
        if (err) {
            return res.json({status: res.statusCode, errror: err.message});
        } else if (null == message) {
            return res.json({status: res.statusCode, message: 'No Data available! '});
        } else {
            res.json({
                status: res.statusCode,
                message: 'Message loaded succesfully...',
                data: message
            });
        }
    });
};
// Handle update message info
exports.update = async  function (req, res) {
    await Message.findById(req.params.message_id, function (err, message) {
        if (err) {
            return res.json({status: res.statusCode, errror: err.message});
        }
        if (null == message) {
            return res.json({status: res.statusCode, message: 'No Data available! '});
        } else {

            message.name = req.body.name;
            message.message = req.body.message;

            message.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    status: res.statusCode,
                    message: 'message Info updated',
                    data: message
                });
            });
        }
    });
};
// Handle delete message
exports.delete = async function (req, res) {
    await Message.remove({
        _id: req.params.message_id
    }, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Message deleted'
        });
    });
};

