const Comments = require('../Schemas/SchemaComments');
//const User = require('../Schemas/SchemaUsers');

/** Get All Comment **/
exports.getAllComments = async function (req, res) {
    await Comments.find({})
        .exec(function (error, response) {
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
                    data: response,
                });
            }

        });
};

/** Get Comments of a given Question Id **/
exports.getCommentsByAnswerId = async function (req, res) {
    await Comments.get(function (err, comment) {
        if (err) {

        }

    });
};

/** Get All comment of a given  userId **/
exports.getCommentsByUserId = async function (req, res) {
    await Comments.findOne({userId: req.params.userId})
};

exports.getQuestionCommentors = async function (req, res) {
    await Comments.findOne({questionId: req.body.questionId})
};

/** Send Comment To a given question Id **/
exports.commentQuestionById = async function (req, res) {
    await Comments.findOneAndUpdate(req.params.commentId, function (err) {

    });
};
exports.updateCommentById = async function (req, res) {
    await Comments.findOne({_id: req.params.commentId})
}
exports.deleteCommentById = async function (req, res, next) {
    await Comments.findOneAndDelete({_id: req.params.commentId}, sort, function (err) {
        if (err) {
            next(err)
        }

    });
};
exports.deleteCommentsByQuestionId = async function (req, res) {
    await Comments.findOneAndDelete({questionId: req.params.questionId}, sort, function (err) {

    });
};

