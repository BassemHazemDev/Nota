
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"user"  }
},{     timeStamp:true  })

const noteModel = mongoose.model("note" , noteSchema)
export default noteModel;