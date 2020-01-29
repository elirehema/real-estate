var mongoose = require('mongoose');
const Schema =  mongoose.Schema,
    ObjectId = Schema.ObjectId;
var RepliesSchemas = new Schema({
    replyDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    replyMessage:{
        type:String,
        required: true,
    },
    questionId:{type: Schema.Types.ObjectId, ref: 'opus_questions'},
    replyVotes: [{ type: Schema.Types.ObjectId, ref: 'opus_users' }],

   
})

const RepliesSchema = module.exports = mongoose.model('opus_replies', RepliesSchemas);


module.exports.get = function(callback, limit) {
  RepliesSchema.find(callback).limit(limit);
};