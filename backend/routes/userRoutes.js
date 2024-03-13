import express from 'express';
const router=express();
import { authUser } from '../controllers/userController.js'


router.post('/auth',authUser);

export default router;