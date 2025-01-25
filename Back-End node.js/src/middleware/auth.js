import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js'

export const auth = (req, res, next) => {
    let authorization = req.header("authorization")
    if (!authorization || (authorization && authorization.startsWith("Bearer") == false))
        return next(new AppError("Invalid token", 400))
    let token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err)
            return next(new AppError("Invalid token", 400))
        req.userId = decoded.userId
        next()
    })
}