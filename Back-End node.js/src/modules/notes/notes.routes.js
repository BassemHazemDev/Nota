import express from 'express'
import { addNote, deleteNote, getAll, updateNote ,getById } from './controller/notes.controller.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validaion.js'
import { addNoteSchema ,updateNoteSchema} from './notes.validation.js'
const router = express.Router()

router.get('/all',auth,getAll)
router.get('/:id',auth,getById)
router.post('/add' , auth ,validation(addNoteSchema), addNote)
router.put('/update' , auth ,validation(updateNoteSchema), updateNote)
router.delete('/delete/:id',auth,deleteNote)




export default router