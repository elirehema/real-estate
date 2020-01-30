var mongoose = require('mongoose');

const constants = require("../config/Constants");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    total: {
        type: Number,
        required: false,
        default: 1
    },
    size: {
        type: String,
        required: true,
        default:"0m X 0m"
    }

});

var RoomSchemas = module.exports = mongoose.model(constants.ROOMS_COLLECTION, RoomSchema);
