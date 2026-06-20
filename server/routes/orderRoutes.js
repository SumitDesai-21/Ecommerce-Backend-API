import express from 'express'
import auth from '../middlewares/authMiddleware';
const orderRouter = express.Router();

orderRouter.post('/', auth);
orderRouter.get('/', auth);


export default orderRouter;