import AppError from "../utils/AppError.js"

export const validation = (schema) =>{
    return (req,res,next) =>{
        let {error} = schema.validate(req.body,{abortEarly:false})
        if(error){
            return next(new AppError(error, 400))
        }else{
            next()
        }
    }
}