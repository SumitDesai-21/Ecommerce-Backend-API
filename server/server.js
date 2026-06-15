import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
const app = express();
await connectDB();

app.get('/', (req, res)=>{
    res.send(`Hello world`);
})


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})

