import express from 'express';
import {
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from '../controllers/categoryController.js';

import {
  authenticateUser,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';

const categoryRouter = express.Router();

//categoryRoutes

categoryRouter
  .route('/')
  .post(authenticateUser, authorizeAdmin, createCategory)
  .get(getCategories);

categoryRouter
  .route('/:categoryId')
  .put(authenticateUser, authorizeAdmin, updateCategory)
  .delete(authenticateUser, authorizeAdmin, deleteCategory)
  .get(getCategoryById);

export default categoryRouter;
