let router = require('express').Router();
const auths = require('../middleware/auth');
var productController = require('../controllers/productController');
// Contact routes
router.route('/products')
    .get(productController.index)
    .post(auths, productController.createNewProduct);
router.route('/products/:productId')
    .get(productController.view)
    .patch(auths, productController.update)
    .put(auths, productController.update)
    .delete(auths, productController.delete);
router.route('/products/:productId/comments')
    .patch(auths, productController.sendComments)
    .get( productController.getAllComments )
router.route('products/:productId/comments/:commentId')
    .get( productController.getCommentById)
    .delete(auths, productController.deleteCommentById)

// Export API routes
module.exports = router;