import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
} from '../controllers/orderController.js';
import {
  authenticateUser,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

//orderRoutes
orderRouter
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizeAdmin, getAllOrders);

orderRouter.route('/:id').delete(authenticateUser, authorizeAdmin, deleteOrder);

orderRouter.route('/mine').get(authenticateUser, getUserOrders);
orderRouter.route('/total-orders').get(countTotalOrders);
orderRouter.route('/total-sales').get(calculateTotalSales);
orderRouter.route('/total-sales-date').get(calculateTotalSalesByDate);
orderRouter.route('/:id').get(authenticateUser, getOrderById);
orderRouter.route('/:id/pay').put(authenticateUser, updateOrderToPaid);
orderRouter
  .route('/:id/delivered')
  .put(authenticateUser, authorizeAdmin, updateOrderToDelivered);

export default orderRouter;
