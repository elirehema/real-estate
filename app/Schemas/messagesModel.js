var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var childSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sentOn: {
        type: String,
        required: true
    }

});

var parentSchema = new Schema({
    period: {
        type: Date,
        required: true
    },
    children: [childSchema],
    child: childSchema
});

parentSchema.methods.getDate = function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-" + (day);
};

parentSchema.methods.getCurrentTime = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
};

var Messages = module.exports = mongoose.model('messages', parentSchema);
module.exports.get = function (callback, limit) {
    Messages.find(callback).limit(limit);
};
