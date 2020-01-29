let Classess = require('../Schemas/SchemaClasses');
exports.getAllClasses = async function (req, res) {
    await Classess.get(function (err, classes) {
        if (err) {
            res.json({
                statusCode: res.statusCode,
                status: res.status,
                message: err,
            });
        }
        res.json({
            statusCode: res.statusCode,
            status: res.status,
            message: "Classes retrieved successfully",
            data: classes
        });
    });
};
exports.createNewClass = async function (req, res) {
    var classes = new Classess();
    classes.className = req.body.name ? req.body.name : classes.name;
    classes.classCode = req.body.code;
    await classes.save(function (err) {
        if (err) {
            return res.json({
                status: res.statusCode,
                error: err
            });
        }
        res.json({
            status: res.statusCode,
            message: 'New class created!',
            data: classes
        });
    });
};
exports.getClassById = async function (req, res) {
    await Classess.findById(req.params.classId, function (err, classes) {
            if (err)
                res.json({
                        status: req.statusCode,
                        message: 'No class with ID: ' +req.params.classId + 'found!'
                    
                })
            
            res.json({
                status: res.statusCode,
                message: 'Class retrieved succesfully ...',
                data: classes

            });
        
    });
};
exports.updateClassById = async function (req, res) {
    await Classess.findById(req.params.classId, function (err, classes) {
        if (err)
            res.send(err);
        classes.className = req.body.name ? req.body.name : classes.name;
        classes.classCode = req.body.code;
        classes.lastUpdated = Date.now();
        classes.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: res.statusCode,
                message: 'Class with ID:' + req.params.classId + 'was updated succesfully',
                data: classes
            });
        });
    });
};

exports.deleteClassById = async function (req, res) {
    await Classess.deleteOne({
        _id: req.params.classId
    }, function (err, classes) {
        if (err)
            res.json({
                status: res.statusCode,
                message: 'No class with id' + req.params.classId
            })
        res.json({
            status: res.statusCode,
            message: 'Class deleted succesfully ...'
        });
    });
};