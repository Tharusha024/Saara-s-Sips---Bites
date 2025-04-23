import express from 'express'
import dotenv from 'dotenv'
import "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import categoriesRoutes from './routes/categoriesRoutes.js'
import offersRoutes from './routes/offersRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app =express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/product",productRoutes);
app.use("/api/user",userRoutes);
app.use("/api/category",categoriesRoutes);
app.use("/api/offers",offersRoutes);


app.listen(process.env.PORT, () => {
    console.log(`sever is runnig in port ${process.env.PORT}`);
});