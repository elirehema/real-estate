const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    fullName:{
        type:String,
        required: true
    },
    gender:{
        type:String,
    },
    thumbNail:{
      type:String
    },
    title: {type: String},
    jobTitle:{type:String},

    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
    },
    address: [{type: ObjectId, ref: 'rental_addresses'}]
}, { bufferCommands: false, collection: 'rental_users' });
/*
Define Model instance method to work with
*/


//getFullName method
UserSchema.methods.getFullName = function() {
    return this.firstName + " " + this.lastName;
};

//find user with similar name in users schema
UserSchema.methods.findUserWithSimilarname = function(cb) {
    return this.model('rental_users').find({
        username: this.username
    }, cb);
};

//Find user with provided email address
UserSchema.methods.findUserWithSimilarEmailAddress = function(email) {
    return this.model('rental_users').find({
        email: this.email
    }, email);
};
/**
 * Define Mongoose Query helper function for mongoose query
 * Let you extends Chainable Builder APi
 * https://mongoosejs.com/docs/queries.html
 * **/


UserSchema.query.byName = function(name){
    return this.where({username: new RegExp(username, 'i')})
};

UserSchema.plugin(uniqueValidator);
const UsersSchema = module.exports = mongoose.model('rental_users', UserSchema);


module.exports.get = function (callback, limit) {
    UsersSchema.find(callback).limit(limit);
};