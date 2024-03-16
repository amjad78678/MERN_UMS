import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';
dotenv.config();

connectDb();
const port=process.env.PORT|| 8001;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users/',userRoutes)
app.use(notFound);
app.use(errorHandler)



app.listen(port,()=>console.log(`listening on port http://localhost:${port}/`));