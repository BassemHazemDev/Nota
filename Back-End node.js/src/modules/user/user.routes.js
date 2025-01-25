import express from 'express'
import { getAll, signIn, signUp ,verify } from './controller/user.controller.js'
import { validation } from '../../middleware/validaion.js'
import { signInSchema, signUpSchema } from './user.validation.js'
const router = express.Router()

router.get('/',getAll)
router.post('/signup' , validation(signUpSchema) , signUp)
router.post('/signin' , validation(signInSchema) , signIn)
router.get('/verify/:token',verify)

export default router