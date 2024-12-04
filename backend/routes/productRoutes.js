import express from 'express';
import formidable from 'express-formidable';
import {
  authenticateUser,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

const productRouter = express.Router();

//controllers
import {
  createProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  getProductById,
  getAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from '../controllers/productController.js';

productRouter
  .route('/')
  .get(fetchProducts)
  .post(authenticateUser, authorizeAdmin, formidable(), createProduct);

productRouter.route('/allproducts').get(getAllProducts);
productRouter
  .route('/:id/reviews')
  .post(authenticateUser, checkId, addProductReview);

productRouter.get('/top', fetchTopProducts);
productRouter.get('/new', fetchNewProducts);

productRouter
  .route('/:id')
  .get(getProductById)
  .put(authenticateUser, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticateUser, authorizeAdmin, /* checkId, */ removeProduct);

productRouter.route('/filtered-products').post(filterProducts);

export default productRouter;
