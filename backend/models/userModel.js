import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo:{
        type: String,
       
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    imageUrl:{
        type:String,
        default:'https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-13.jpg'
    },
    isBlocked:{
        type:Boolean,
        default:false
    },

},{
    timestamps:true
})

userSchema.pre('save',async function(next){

    if(!this.isModified('password')){
        next();
    }else{

        const salt =await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
    }
})

userSchema.methods.matchPassword=async function (enteredPassword){
     
     return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User", userSchema);

export default User;