import express from 'express'
import auth from '../middlewares/authMiddleware.js';
import { addToCart, deleteItemFromCart, showCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add', auth, addToCart);
cartRouter.get('/', auth, showCart);
cartRouter.delete('/:id', auth, deleteItemFromCart);

export default cartRouter;