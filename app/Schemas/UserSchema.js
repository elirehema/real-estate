const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const constants = require("../config/Constants");
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    thumbNail: {
        type: String,
        required: false,
    },
    title: {type: String},
    jobTitle: {type: String},
    about:{type:String},

    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
    },
    address: {type: ObjectId, ref: constants.ADDRESS_COLLECTION}
}, {bufferCommands: false, collection: constants.USERS_COLLECTION});
/*
Define Model instance method to work with
*/


//getFullName method
UserSchema.methods.getFullName = function () {
    return this.firstName + " " + this.lastName;
};

//find user with similar name in users schema
UserSchema.methods.findUserWithSimilarname = function (cb) {
    return this.model(constants.USERS_COLLECTION).find({
        username: this.username
    }, cb);
};

//Find user with provided email address
UserSchema.methods.findUserWithSimilarEmailAddress = function (email) {
    return this.model(constants.USERS_COLLECTION).find({
        email: this.email
    }, email);
};
/**
 * Define Mongoose Query helper function for mongoose query
 * Let you extends Chainable Builder APi
 * https://mongoosejs.com/docs/queries.html
 * **/


UserSchema.query.byName = function (name) {
    return this.where({username: new RegExp(username, 'i')})
};

UserSchema.plugin(uniqueValidator);
const UsersSchema = module.exports = mongoose.model(constants.USERS_COLLECTION, UserSchema);


module.exports.get = function (callback, limit) {
    UsersSchema.find(callback).limit(limit);
};