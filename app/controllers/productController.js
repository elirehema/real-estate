// Import product model
const Product = require('../Schemas/productModel');

// Handle index actions

exports.index = async  function (req, res) {
    await Product.get(function (err, products) {
        if (err) {
            res.json({
                status: res.status(),
                message: err,
            });
        }
        res.json({
            status: res.statusCode,
            message: "Product retrieved successfully",
            data: products
        });
    });
};
// Handle create product actions
exports.createNewProduct = async  function (req, res) {
    var product = new Product();
    product.name = req.body.name ? req.body.name : product.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.phone = req.body.phone;
    product.color = req.body.color;
    product.comments = [];
    // save the product and check for errors
     product.save(function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
        }
        //res.json({ status: 500, product: product });
        res.json({
            status: res.statusCode,
            message: 'New product created!',
            data: product
        });
    });
};
// Handle view product info
exports.view = async function (req, res) {
    await Product.findById(req.params.productId, function (err, product) {
        if (err)
            res.send(err.message);
        res.json({
            status: res.statusCode,
            message: 'Product details loading..',
            data: product
        });
    });
};



// Handle update product info
exports.update = async  function (req, res) {
    await Product.findById(req.params.productId, function (err, product) {
        if (err) res.send(err);
        product.name = req.body.name ? req.body.name : product.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.phone = req.body.phone;
        product.color = req.body.color;
        // save the product and check for errors
     product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: res.statusCode,
                message: 'Product Info updated',
                data: product
            });
        });
    });
};
exports.sendComments = async function(req, res){
    var update = { $addToSet: { comments: {sendername: req.body.sendername, message: req.body.message, comment_on: Date.now()}}
      }
    await Product.findByIdAndUpdate(req.params.productId,update,function (err) {
        if (err) {
            return res.json({ status: res.statusCode, error: err.message });
          } else { res.json({ status: res.statusCode, message: 'Comment sent !'});}
    });
};
exports.getAllComments = async function (req, res) {
    await Product.findById(req.params.productId, function (err, product) {
        if (err)
            res.send(err.message);
        res.json({
            status: res.statusCode,
            message: 'List of comments..',
            data: product.comments
        });
    });
};
exports.getCommentById = async function(req, res){
    await Product.findById(req.params.productId, function (err, product) {
        if (err)
            res.send(err.message);
        res.json({
            status: res.statusCode,
            message: 'Comment by id..',
            data: product.comments
        });
    });
}
/** Define delete Comment operation**/
exports.deleteCommentById = async function(req, res){
    await Product.update(
        { _id: req.params.productId },
        { $pull: { comments:{ _id: req.params.commentId }}},
        { multi: true },
         function(err, product){
        if(err){
            res.json({
                status: res.status,
                message: err.message,

            })
            res.json({
                status: res.status,
                message: "Comment Deleted Succesfully !",
            })

        }
    });
}
// Handle delete product
exports.delete = async function (req, res) {
   await  Product.remove({
        _id: req.params.productId
    }, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            status: res.statusCode,
            message: 'Product deleted'
        });
    });
};