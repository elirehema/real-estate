// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
// Export Message model
//export default messageSchema;
/*
var Message = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
};

 */