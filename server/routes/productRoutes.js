import express from 'express';
import checkIfAdmin from '../middlewares/adminMiddleware.js';
import { createProduct, getAllProducts, getProductById, updatedProduct } from '../controllers/productController.js';
import auth from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/', auth, checkIfAdmin, createProduct);
productRouter.get('/:id', getProductById);
productRouter.get('/', getAllProducts);
productRouter.put('/:id', auth, checkIfAdmin, updatedProduct);

export default productRouter;