var mongoose = require('mongoose');
const Schema =  mongoose.Schema,
    ObjectId = Schema.ObjectId;
var AnswersSchemas = new Schema({
    Date:{
        type: Date,
        required: true,
        default: Date.now
    },
    answerMessage:{
        type:String,
        required: true,
    },
    questionId:{type: Schema.Types.ObjectId, ref: 'opus_questions'},
    answerVoters: [{ type: Schema.Types.ObjectId, ref: 'opus_users' }],
    answerComments: [{
        type: Schema.Types.ObjectId,
        ref: 'opus_comments'
    }]
   
})

const AnswersSchema = module.exports = mongoose.model('opus_answers', AnswersSchemas);


module.exports.get = function(callback, limit) {
  AnswersSchema.find(callback).limit(limit);
};