//define Questions Schema

var mongoose = require('mongoose');
//mongoose.plugin(require('../plugins/loadedAt'))
const Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

var QuestionsSchemas = new Schema({
    question: {
        type: String,
        required: true
    },
    questionValidity: {
        type: Boolean,
        default: true
    },
    questionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    questionAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'opus_users'
    },
    questionVotes: Number,
    questionAnswers: [{
        type: Schema.Types.ObjectId,
        ref: 'opus_answers',
        
    }],
    questionReplies: [{
        type: ObjectId,
        ref: 'opus_replies'
    }],
    questionLastUpdated: {
        type: Date
    }


});

const QuestionsSchema = module.exports = mongoose.model('opus_questions', QuestionsSchemas);


module.exports.get = function (callback, limit) {
    QuestionsSchema.find(callback).limit(limit);
};