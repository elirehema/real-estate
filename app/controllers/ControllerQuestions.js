//define QuestionController.js
Schema = require('../Schemas/SchemaQuestions');
exports.getAllQuestions = async function (req, res) {
    await Schema.find({})
        .populate({path: "questionAnswers", model: "opus_answers"})
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
/** Ask new question **/
exports.askNewQuestion = async function (req, res) {
    var question = new Schema();
    question.question = req.body.question;
    question.questionAnswers = await Answer.find();
    question.save(function (err) {
        if (err) {
            return res.json({status: res.statusCode, error: err.message});
        }
        res.json({
            status: res.statusCode,
            message: 'Created succesfully...!',
            data: question
        });
    })
};

/** Update Questions **/
exports.updateQuestion = async function (req, res) {
    await Schema.findById(req.params.questionId, function (err, question) {
        if (err) res.send(err);
        question.question = req.body.question ? req.body.question : question.question;
        question.questionLastUpdated = Date.now();
        question.save(function (err) {
            if (err)
                res.json({
                    status: res.statusCode,
                    message: res.message,
                });
            res.json({
                status: res.statusCode,
                message: 'Updated Succesfully',
                data: question
            });
        });
    });
};
/**Delete Questions **/
exports.deleteQuestion = async function (req, res) {
    await Comments.remove({
        _id: req.params.questionId
    }, function (err, question) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Question Deleted Succesfully ...'
        });
    });
};

/** Get question by Id **/
exports.getQuestionById = async function (req, res) {
    await Schema.findOne({_id: req.params.questionId})
        .populate({path: "questionAnswers", model: "opus_answers"})
        .populate({path: "questionReplies", model: "opus_replies"})
        .exec(function (err, question) {
            if (err) return handleError(err);
            res.json({
                status: res.statusCode,
                message: 'Created succesfully...!',
                data: question,
            });
        });
};
/** Answer  to specific question **/
exports.answerTheQuestion = async function (req, res) {
    var answer = new Answer();
    Schema.findOneAndUpdate(
        {_id: req.params.questionId},
        {$push: {questionAnswers: answer._id}},
        function (error, success) {
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
                answer.answerMessage = req.body.message;
                answer.questionId = req.params.questionId;
                answer.save(function (err) {
                    if (err) {
                        return res.json({status: res.statusCode, error: err.message});
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'Created succesfully...!',
                        data: answer
                    });
                });
            }
        });
};

/** Reply to specific question **/
exports.replyToQuestion = async function (req, res) {
    var reply = new Replies();
    Schema.findOneAndUpdate(
        {_id: req.params.questionId},
        {$push: {questionReplies: reply._id}},
        function (error, success) {
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
                reply.replyMessage = req.body.message;
                reply.questionId = req.params.questionId;
                reply.save(function (err) {
                    if (err) {
                        return res.json({status: res.statusCode, error: err.message});
                    }
                    res.json({
                        status: res.statusCode,
                        message: 'Created succesfully...!',
                        data: reply
                    });
                });
            }
        });
};

/** Get Specific Question Replies **/
exports.getAllQuestionReplies = async function (req, res) {
    await Schema.findOne({_id: req.params.questionId}).select('questionReplies')
        .populate({path: "questionReplies", model: "opus_replies"})
        .exec(function (err, answers) {
            if (err) {
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        })
};



/** Get Specific Question Answers ID's**/
exports.getAllQuestionAnswerIds = async function (req, res) {
    await Schema.findOne({_id: req.params.questionId}).select('questionAnswers')
        .exec(function (error, answers) {
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
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        })
};

/** Get Specific Question Replies ID's**/
exports.getAllQuestionRepliesIds = async function (req, res) {
    await Schema.findOne({_id: req.params.questionId}).select('questionReplies')
        .exec(function (error, answers) {
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
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        })
}

/** Get Specific Question Answers **/
exports.getAllQuestionAnswers = async function (req, res) {
    await Schema.findOne({_id: req.params.questionId}).select('questionAnswers')
        .populate({path: "questionAnswers", model: "opus_answers"})
        .exec(function (err, answers) {
            if (err) {
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers,
                });
            }

        })
};
/** Get Specific Question AnswerById **/
exports.getAllQuestionAnswerByAnswerId = async function (req, res) {
    await Schema.findOne({_id: req.params.questionId}).select('questionAnswers')
        .populate({path: "questionAnswers", model: "opus_answers"})
        .exec(function (err, answers) {
            if (err) {
            } else {
                res.json({
                    message: 'Created succesfully...!',
                    data: answers.questionAnswers.find(answer => answer._id = req.params.answerId),
                });
            }

        })
};
exports.upvoteQuestionAnswer = async function (req, res) {
    await Schema.update({_id: req.params.questionId, 'questionAnswers._id': req.params.answerId},
        {$addToSet: {'questionAnswers.$.replyVoters': req.body.userId}},
        {upsert: true}, function (err, question) {
            if (err) {
                res.json({
                    status: err.status
                });
            }
            res.json({
                status: res.status,
                data: question
            });
        });
};

handleError = function (err) {
    console.log("Error " + err + "has occured !!!")
};