//define single class Schema.js 
var mongoose = require('mongoose');
var ClassSchemas = new mongoose.Schema({
        className:{
            type: String,
            required: true
        },
        classCode:{
            type: String,
            required: true,
        },
        classSubjects:[{
            subjectName:{
                type: String,
                required: true
            },
            subjectCode:{
                type: String,
                required: true,
            },
        }]

});

var ClassSchema = module.exports = mongoose.model('SingleClass', ClassSchema);
