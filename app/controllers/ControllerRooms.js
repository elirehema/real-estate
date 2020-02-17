const SchemaRoom = require('../Schemas/SchemaRoom');
const SchemaApartment = require('../Schemas/SchemaApartment');

/**Get All {@link Rooms} in the system no authentication required**/
exports.getAllRooms = async function (req, res) {
    await SchemaRoom.find({}).sort('-createdDate')
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

exports.getRoomById = async function (req, res) {
    await SchemaRoom.findOne({ _id: req.params.roomId })
        .exec(function (err, response) {
            if (err) {
                return res.json({ status: res.statusCode, errror: err.message });
            } else if (null == response) {
                return res.json({ status: res.statusCode, message: 'No Data available! ' });
            } else {
                return res.json(response);
            }
        });
};

exports.updateRoomById = async function (req, res) {
    await SchemaRoom.findById(req.params.roomId, function (err, room) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        } else if (null == room) {
            return res.json({ status: res.statusCode, message: 'No Data available! ' });
        } else {

            room.title = req.body.title ? req.body.title : room.title;
            room.name = req.body.name ? req.body.name : room.name;
            room.description = req.body.description ? req.body.description : room.description;
            room.total = req.body.total ? req.body.total : room.total;
            room.size = req.body.size ? req.body.size : room.size;
            room.save(function (err) {
                if (err) {
                    return res.json({ status: res.statusCode, error: err.message });
                }
                return res.json({
                    status: res.statusCode,
                    message: 'Room updated succesfully...!',
                    data: room
                });
            });
        }


    });
};