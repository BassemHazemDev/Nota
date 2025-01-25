import noteModel from "../../../../database/models/note.model.js"
import AppError from "../../../utils/AppError.js"


export const addNote = async (req, res ,next) => {
    let { title, description} = req.body
    let newNote = await noteModel.insertMany({ title, description, createdBy: req.userId })
    res.status(201).json({ message: "success" })
}

export const getAll = async (req, res ,next) => {
    let notes = await noteModel.find().populate("createdBy", "name")
    res.status(200).json({ message: "success", notes })
}
export const getById = async (req, res ,next) => {
    let { id } = req.params
    let notes = await noteModel.find({ createdBy: id }).populate("createdBy", "name")
    res.status(200).json({ message: "success", notes })
}

export const updateNote = async (req, res,next) => {
    let {  _id, title ,description} = req.body
    let updatedNote = await noteModel.findOneAndUpdate({_id , createdBy:req.userId}, { title , description }, { new: true })
    updatedNote ? res.status(200).json({ message: "success", updatedNote }) :  next(new AppError("Update error", 400))
}

export const deleteNote = async (req, res,next) => {
    let { id } = req.params
    let deleted = await noteModel.findOneAndDelete({ _id: id })
    deleted ? res.json({ message: "done", deleted }) : next(new AppError("Note not found", 404))
}
