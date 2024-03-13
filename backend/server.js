import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import userRoutes from './routes/userRoutes.js'



const port=process.env.PORT|| 3000;
const app = express();


app.use('/api/users/',userRoutes)
app.get('/',(req,res)=>res.send('server is ready'))

app.listen(port,()=>console.log(`listening on port http://localhost:${port}/`));