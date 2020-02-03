const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const constants = require("../config/Constants");
// Setup schema
var AddressSchemas = mongoose.Schema({
    lineOne: {
        type: String,
    },
    lineTwo: {
        type: String,
    },
    homeNumber: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    state: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

   


}, {bufferCommands: false, collection: constants.ADDRESS_COLLECTION});

const AddressSchema = mongoose.model(constants.ADDRESS_COLLECTION, AddressSchemas);

module.exports = AddressSchema;
