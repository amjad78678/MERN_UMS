import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';
import cors from 'cors'
import morgan from 'morgan';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDb();
const port=process.env.PORT|| 8001;
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/users/',userRoutes)
app.use('/api/admin/',adminRoutes)
app.use(notFound);
app.use(errorHandler)



app.listen(port,()=>console.log(`listening on port http://localhost:${port}/`));