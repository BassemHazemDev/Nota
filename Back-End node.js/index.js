import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config({})
import {connection} from './database/connection.js'
import userRoutes from './src/modules/user/user.routes.js'
import notesRutes from './src/modules/notes/notes.routes.js'
import AppError from './src/utils/AppError.js'
import globalError from './src/utils/globalErrorHandler.js'
import cors from 'cors'


const app = express()
const port = 5000

connection()
app.use(express.json())
app.use(cors())


app.use('/user', userRoutes)
app.use('/note', notesRutes)
app.get('/', (req, res) => res.status(200).json('Hello World!'))
app.listen(port, () => console.log(`listening on port ${port}`))

app.use("*",(req,res,next)=>{ 
    next(new AppError(`Route not found : ${req.originalUrl}`,404))
})  

process.on("unhandledRejection",(err,req,res,next)=>{
    next(err)
}) 

process.on("uncaughtException",(err,req,res,next)=>{
    next(err)
})

app.use(globalError)