import express from 'express'
import auth from '../middlewares/authMiddleware.js';
import { getOrders, placeOrder } from '../controllers/orderController.js';
const orderRouter = express.Router();

orderRouter.post('/', auth, placeOrder);
orderRouter.get('/', auth, getOrders);


export default orderRouter;