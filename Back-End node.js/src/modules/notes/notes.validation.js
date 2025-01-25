import Joi from "joi";

const addNoteSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    createdBy: Joi.string().length(24)
})
const updateNoteSchema = Joi.object({
    _id: Joi.string().length(24).required(),
    title:Joi.string().min(3).max(30),
    description: Joi.string(),
})
export {addNoteSchema , updateNoteSchema}