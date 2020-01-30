const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var  bcrypt = require('bcryptjs');
const  SALT_WORK_FACTOR = 10;
jwt = require('jsonwebtoken');
config = require('../config/config');
const uniqueValidator = require('mongoose-unique-validator');
const constants = require("../config/Constants");



const UserAuthSchema = mongoose.Schema({
  email: {type: String, index: true, unique: true, required: true },
  password: {
    type: String,
    required: true
  }
});
UserAuthSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserAuthSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
UserAuthSchema.plugin(uniqueValidator);
var AuthSchema = module.exports = mongoose.model(constants.AUTHS_COLLECTION, UserAuthSchema);
module.exports.get = function(callback, limit) {
  AuthSchema.find(callback).limit(limit);
};
