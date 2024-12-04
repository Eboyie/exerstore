import express from 'express';
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';

import {
  authenticateUser,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .post(createUser)
  .get(authenticateUser, authorizeAdmin, getAllUsers);

//User Routes
userRouter.post('/auth', loginUser);
userRouter.post('/logout', logoutCurrentUser);
//
userRouter
  .route('/profile')
  .get(authenticateUser, getCurrentUserProfile)
  .put(authenticateUser, updateCurrentUserProfile);

//Admin Routes
userRouter
  .route('/:id')
  .delete(authenticateUser, authorizeAdmin, deleteUserById)
  .get(authenticateUser, authorizeAdmin, getUserById)
  .put(authenticateUser, authorizeAdmin, updateUserById);

export default userRouter;
