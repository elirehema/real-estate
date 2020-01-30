var mongoose = require('mongoose');

const constants = require("../config/Constants");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var TermsAndConditionSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    descriptions: {
        type: String,
        required: true,
        default: ""
    }

});

var TermsAndConditionSchemas = module.exports = mongoose.model(constants.TERMANDCONDITION_COLLECTION, TermsAndConditionSchema);
