//define classes Schema for multiple classes

var mongoose = require('mongoose');
var ClassesSchema = mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

var Classes = module.exports = mongoose.model('Classes', ClassesSchema);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}