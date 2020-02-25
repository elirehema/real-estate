var mongoose = require('mongoose');

const constants = require("../config/Constants");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var ExtraCostSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    amount: {
        type: String,
        required: true,
        default: 0
    },
    paymenttype: {
        type: String,
        required: true,
        default:""
    },
    termsAndConditions:[{ type: Schema.Types.ObjectId, ref: constants.TERMANDCONDITION_COLLECTION}]

});

var ExtraCostSchemas = module.exports = mongoose.model(constants.COSTS_COLLECTION, ExtraCostSchema);
