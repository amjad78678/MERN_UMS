
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { cloudinary } from '../utils/cloudinary.js';

const authUser=asyncHandler(async(req,res)=>{

    console.log('iam body',req.body)
     const {email,password}=req.body;

    const user= await User.findOne({email:email})

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                imageUrl:user.imageUrl

            })
        
    }else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
  

});

const registerUser=asyncHandler(async(req,res)=>{
     
    console.log('register reqbody',req.body)

    const {name,email,password}=req.body

    const userExists=await User.findOne({email})

    if(userExists){
       res.status(400);
       throw new Error('User already exists');
    }else{
    const user=await User.create({name,email,password})  

    if(user){
        generateToken(res,user._id)
        res.status(201).json({_id:user._id,name:user.name,email:user.email,imageUrl:user.imageUrl})
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

    }

});

const logoutUser=asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User logged out'})
});

const getUserProfile=asyncHandler(async(req,res)=>{

    console.log('iam md req.user',req.user)
  
    res.status(200).json(req.user);

});

const updateUserProfile=asyncHandler(async(req,res)=>{
   
    const user=await User.findById(req.user._id)

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

});
    


export {
    authUser,
    registerUser,    
    logoutUser,
    getUserProfile,
    updateUserProfile,
}