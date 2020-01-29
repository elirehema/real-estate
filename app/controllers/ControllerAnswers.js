const Answers = require('../Schemas/SchemaAnswers');
const Comments = require('../Schemas/SchemaComments');
const Questions = require('../Schemas/SchemaQuestions');
/** Get All Answers **/
exports.getAllAnswers = async function (req, res) {
    await Answers.find({})
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
/** Get Answer by its _id **/
exports.getAnswerByAnswerId = async function (req, res) {
    await Answers.findOne({_id: req.params.answerId})
        .populate({path: "answerComments", model: "opus_comments"})
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                size: response.answerComments.length,
                message: "Retrieved successfully",
                data: response
            });
        });
};
exports.getAnswerVoters = async function (req, res) {
    await Answers.findOne({_id: req.params.answerId}).select('answerVoters')
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
exports.getAnswerComments = async function (req, res) {
    await Answers.findOne({_id: req.params.answerId}).select('answerComments')
        .populate({path: "answerComments", model: "opus_comments"})
        .exec(function (err, response) {
            if (err) {
                res.json({
                    status: res.statusCode,
                    message: err.message,
                });
            }
            res.json({
                status: res.statusCode,
                message: "Retrieved successfull",
                data: response
            });
        });
};
/** Get Answer by its Its question id **/
exports.getAnswersByQuestionId = async function (req, res) {
    await Answers.find(req.params.answerId, function (err) {
        if (err) {

        }
    });
};

exports.commentOnQuestionAnswer = async function (req, res) {
    var comment = new Comments();
    await Answers.findOneAndUpdate(
        {_id: req.params.answerId},
        {$push: {answerComments: comment._id}},
        function (error, response) {
            if (error) {
                res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            } else {
                comment.answerMessage = req.body.message;
                comment.userId = req.body.userId;
                comment.answerId = req.params.answerId;
                comment.save(function (err) {
                    if (err) {
                        return res.json({status: res.statusCode, error: err.message});
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'Created succesfully...!',
                        data: response
                    });
                });
            }
        });

};

exports.upvoteAnswer = async function (req, res) {
    await Answers.findOneAndUpdate(
        {_id: req.params.answerId},
        {$addToSet: {'answerVoters': req.body.userId}},
        {upsert: true}, function (err,  response) {
            
            res.json({
                status: res.status,
                data: response
            });
        });

};

handlerError = function(error){
    console.log(JSON.stringify({
        message: error.message,
        name: error.name,
        kind: error.kind,
        path: error.path,
        reason: error.reason,
        model: error.model
    }))
}