import nodemailer from 'nodemailer'
import { htmlCode } from './email.templete.js'
import jwt from 'jsonwebtoken'


export const sendEmail = async (options) =>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    })
    let token = jwt.sign({email : options.email},process.env.TOKEN_KEY_VERIFY)
    let info = await transporter.sendMail({
        from: "Nota cheack",
        to: options.email,
        subject: "Hello from Nota app",
        html: htmlCode(token)
    })
}
