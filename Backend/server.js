import express from 'express';
import connectToDb from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'



const port = process.env.PORT || 8000;

connectToDb();

const app = express();

//body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});