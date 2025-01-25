import userModel from "../../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../../services/email.js';
import catchAsyncError from "../../../utils/CatchAsyncError.js"
import AppError from '../../../utils/AppError.js';

export const getAll = catchAsyncError(async (req, res, next) => {
    const users = await userModel.find()
    res.status(200).json({ message: "success", users })
})
export const signUp = catchAsyncError(async (req, res, next) => {
    const { name, email ,age, password, cPassword } = req.body
    if (password !== cPassword) {
        return next(new AppError("Password not match", 400))
    }
    let checkUser = await userModel.findOne({ email })
    if (checkUser)
        return next(new AppError("Already rigestered", 400))
    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALTROUNDS))
    let newUser = await userModel.insertMany({ name, email, age , password: hashedPassword })
    sendEmail({ email })
    res.status(201).json({ message: "success"})
})

export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    let checkUser = await userModel.findOne({ email })
    if (!checkUser)
        return next(new AppError("User not found", 400))
    let matched = bcrypt.compareSync(password, checkUser.password)
    if (!matched)
        return next(new AppError("password not correct", 400))
    let token = jwt.sign({ userId: checkUser.id, name: checkUser.name , email: checkUser.email }, process.env.TOKEN_KEY, { expiresIn: "1h" })
    res.status(200).json({ message: "success", token })
})

export const verify = catchAsyncError( async (req, res,next) => {
    let { token } = req.params
    jwt.verify(token, process.env.TOKEN_KEY_VERIFY, async (err, decoded) => {
        if (err) return next(new AppError("invalid token",400))
        let verifiedUser = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmedemail: true }, { new: true })
        verifiedUser.password = undefined
        res.status(200).json({ message: "success"})
    })
})
