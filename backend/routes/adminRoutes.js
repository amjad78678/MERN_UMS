import express from 'express'
const adminRouter=express()
import { authAdmin,adminLogout,getUsers, addUser,updateUser,deleteUser,blockUser } from '../controllers/adminController.js'   
import { upload } from '../middleware/multer.js'



adminRouter.post('/',authAdmin)
adminRouter.post('/logout',adminLogout)
adminRouter.get('/users',getUsers)
adminRouter.post('/add-user',upload.single('image'),addUser)
adminRouter.put('/updateUser',updateUser)
adminRouter.delete('/delete-user',deleteUser)
adminRouter.patch('/block-user',blockUser)


export default adminRouter


