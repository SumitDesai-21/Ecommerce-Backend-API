import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
await connectDB();

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})

