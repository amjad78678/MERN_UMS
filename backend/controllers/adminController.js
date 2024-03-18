import User from '../models/userModel.js'  
import { cloudinary } from '../utils/cloudinary.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const authAdmin=asyncHandler(async(req,res)=>{

      console.log(req.body)

      const {email,password}=req.body

      const admin = await User.findOne({email:email})

      if(admin && admin.isAdmin && (await admin.matchPassword(password))){

        generateToken(res,admin._id,'adminJwt')

        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            imageUrl:admin.imageUrl
        })

      }else{
        res.status(401);
        throw new Error('Invalid email or password');
      }

       

})

const adminLogout=asyncHandler(async(req,res)=>{


 res.cookie('adminJwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'Admin logged out'})

})

const getUsers=asyncHandler(async(req,res)=>{


    const userData = await User.find({ isAdmin: { $ne: true } }).select('-password');
    res.status(200).json(userData)


})

const addUser=asyncHandler(async(req,res)=>{

    console.log('iam reqfile',req.file)
    console.log('req.boudu',req.body)

    let imageUrl='https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-13.jpg'
    if(req.file){

        const res=await cloudinary.uploader.upload(req.file.path)
        console.log('iam cloudinary upload result',res)
        imageUrl=res.secure_url||null
 
        const filePath = path.join(__dirname,'..','public','userImages', req.file.filename);
         fs.unlink(filePath,(err)=>{
         console.error('Error deleting file (fs.unlink):' + err);
        })
     }

    const {name,email,password}=req.body

    const userExists=await User.findOne({email})

    if(userExists){
       res.status(400);
       throw new Error('User already exists');
          
    }else{
    const user=await User.create({name,email,password,imageUrl:imageUrl})  

    if(user){
        res.status(201).json({_id:user._id,name:user.name,email:user.email,imageUrl:user.imageUrl})
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

    }

})

const updateUser=asyncHandler(async(req,res)=>{

    const {userId}=req.body

    const user=await User.findOne({_id:userId})

    console.log('iamReqBody',req.body)
    console.log('reqfieleeeeeee',req.file)

    if(user){


        if(req.file){

            const res=await cloudinary.uploader.upload(req.file.path)
            console.log('iam cloudinary upload result',res)
            user.imageUrl=res.secure_url||null
     
            const filePath = path.join(__dirname,'..','public','userImages', req.file.filename);
            fs.unlink(filePath,(err)=>{
             console.error('Error deleting file (fs.unlink):' + err);
            })
         }
   
        user.name=req.body.name
        user.email=req.body.email
       
        if(req.body.password){

            user.password=req.body.password
        }

      const updatedUser=await user.save()

     return res.status(200).json(updatedUser)

    }else{
        res.status(404);
        throw new Error('User not found')
    }


    res.status(200).json({message:'Update User Profile'})
})

const deleteUser=asyncHandler(async(req,res)=>{
     
     const {userId} =req.body

     console.log('iam reqbody',req.body)

     const deleteData= await User.deleteOne({_id:userId})

     console.log('iamdeletedata',deleteData)
     res.status(201).json({message:'User deleted'})
})

const blockUser=asyncHandler(async(req,res)=>{
   
    console.log('iam req',req.body)

    const {userId}=req.body

   const user=await User.findOne({_id:userId})

   user.isBlocked=!user.isBlocked

    const data=await user.save()

    res.status(200).json({message:'Successfully updated'})

})

export {authAdmin,adminLogout,getUsers,addUser,updateUser,deleteUser,blockUser}