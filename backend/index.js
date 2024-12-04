// packages

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//utils
import connectDB from './config/db.js';

//routes
import userRouter from './routes/userRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
