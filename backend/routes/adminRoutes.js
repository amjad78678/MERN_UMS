import express from 'express'
const adminRouter=express()
import { authAdmin,adminLogout,getUsers, addUser,getUpdateUser,deleteUser,blockUser,updateUser } from '../controllers/adminController.js'   
import { upload } from '../middleware/multer.js'
import { adminProtect } from '../middleware/adminAuthMiddleware.js'



adminRouter.post('/',authAdmin)
adminRouter.post('/logout',adminLogout)
adminRouter.get('/users',adminProtect,getUsers)
adminRouter.post('/add-user',adminProtect,upload.single('image'),addUser)
adminRouter.delete('/delete-user',adminProtect,deleteUser)
adminRouter.patch('/block-user',adminProtect,blockUser)
adminRouter.get('/get-update-user/:id',adminProtect,getUpdateUser)
adminRouter.put('/update-user',upload.single('image'),adminProtect,updateUser)   


export default adminRouter


