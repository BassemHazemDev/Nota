
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password:String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    }
    
},{     timestamps:true     })

const userModel = mongoose.model("user" , userSchema)

export default userModel;