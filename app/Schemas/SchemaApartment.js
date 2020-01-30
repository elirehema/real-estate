var mongoose = require('mongoose');
const constants = require("../config/Constants");
const Schema =  mongoose.Schema,
    ObjectId = Schema.ObjectId;
var ApartmentSchema = new Schema({
    apartmentName:{
        type: String,
        required: true
    },

    apartmentType: {
        type: String,
        required: true,
        default:"Single house"
    },
    longitude:{
        type: String,
        required: true,
        default: "0.0"
    },
    latitude:{
        type: String,
        required: true,
        default: "0.0"
    },
    pricePerMonth:{
        type: String,
        required: true,
        default: "0 TSH"
    },
    amount:{
        type: String,
        required: true,
        default: "0 TSH"
    },
    description:{
        type: String,
        required: true,
        default: ""
    },
    thumbNail:{
        type: String,
        required: true,
        default:"https://i.pinimg.com/736x/1f/0a/6b/1f0a6b5299947a37cc9ec48140115254--girly-pictures-senior-pictures.jpg"

    },
    roomImages:{
        type: Array,
        required: true
   },
    ownerInfos:{ type: Schema.Types.ObjectId, ref: constants.USERS_COLLECTION },
    rooms: [{ type: Schema.Types.ObjectId, ref: constants.ROOMS_COLLECTION}],
    extraCosts:[{ type: Schema.Types.ObjectId, ref: constants.COSTS_COLLECTION}],

});

var ApartmentSchemas = module.exports = mongoose.model(constants.APARTMENT_COLLECTION, ApartmentSchema);
