import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.CONNECTION_URL).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Error connecting to MongoDB",err);
    })
}