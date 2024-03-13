
import asyncHandler from 'express-async-handler'


//auth user set token
//POST /api/users/auth
//public
const authUser=asyncHandler(async(req,res)=>{

    res.status(200).json({message:'Auth user'})

});



export {
    authUser
}