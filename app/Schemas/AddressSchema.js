const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
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
    },

    aboutMe: {
        type: String,
        require: false
    }


}, {bufferCommands: false, collection: 'rental_addresses'});

const AddressSchema = mongoose.model('rental_addresses', AddressSchemas);

module.exports = AddressSchema;
