// Import product model
const Apartments = require('../Schemas/SchemaApartment');
const ExtraCosts = require('../Schemas/SchemaExtraCosts');
const Rooms = require('../Schemas/SchemaRoom');
const Terms = require('../Schemas/SchemaTermsAndCondition');

/**Get All {@link Apartments} in the system no authentication required**/
exports.getAllApartments = async function (req, res) {
    await Apartments.find({})
        .exec(function (err, response) {
            if (err) {
                return res.json({
                    status: res.status(),
                    message: err,
                });
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            });
        });
};

/** Get Single {@link Apartments} by Apartment ID, "No Auth is Optional" **/
exports.getAllApartmentById = async function (req, res) {
    await Apartments.findOne({_id: req.params.apartmentId})
        .exec(function (error, response) {
            if (error) {
                return res.json({
                    message: error.message,
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    reason: error.reason,
                    model: error.model
                })
            }
            return res.json({
                status: res.statusCode,
                message: "Product retrieved successfully",
                data: response
            })
        })
};
/**Create new {@link Apartments} with request from body object, ``Authentication is Mandatory` **/
exports.createNewApartment = async function (req, res) {
    var apartment = new Apartments();
    apartment.apartmentName = req.body.name;
    apartment.apartmentType = req.body.type;
    apartment.longitude = req.body.longitude;
    apartment.latitude = req.body.latitude;
    apartment.paymentTerms = req.body.terms;
    apartment.amount = req.body.amount;
    apartment.description = req.body.description;
    apartment.thumbNail = req.body.image;
    apartment.roomImages = req.body.images;
    apartment.save(function (error) {
        if (error) {
            return res.json({
                message: error.message,
                name: error.name,
                kind: error.kind,
                path: error.path,
                reason: error.reason,
                model: error.model
            })
        }
        return res.json({
            status: res.statusCode,
            message: 'New User created succesfully!',
            data: apartment
        });
    })

};

/** Update Single {@link Apartments} by given Apartment ID ``Authentication is Mandatory``**/
exports.updateApartmentById = async function(req, res){
  await Apartments.findById(req.params.apartmentId, function (error, apartment) {
      if (error){
          return res.json({
              message: error.message,
              name: error.name,
              kind: error.kind,
              path: error.path,
              reason: error.reason,
              model: error.model
          })
      }
      apartment.apartmentName = req.body.name;
      apartment.apartmentType = req.body.type;
      apartment.longitude = req.body.longitude;
      apartment.latitude = req.body.latitude;
      apartment.paymentTerms = req.body.terms;
      apartment.amount = req.body.amount;
      apartment.description = req.body.description;
      apartment.thumbNail = req.body.image;
      apartment.roomImages = req.body.images;
      apartment.save(function (error) {
          if (error) {
              return res.json({
                  message: error.message,
                  name: error.name,
                  kind: error.kind,
                  path: error.path,
                  reason: error.reason,
                  model: error.model
              })
          }
          return res.json({
              status: res.statusCode,
              message: 'New User created succesfully!',
              data: apartment
          });
      })

  })
};

/**
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
 /** Define delete Comment operation**
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
} **/
// Handle delete product
exports.delete = async function (req, res) {
    await Apartments.remove({
        _id: req.params.apartmentId
    }, function (err, response) {
        if (err) {
            return res.send(err);
        }
        return res.json({
            status: res.statusCode,
            message: 'Product deleted'
        });
    });
};