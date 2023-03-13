import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import NoteModel from '../models/note'
import mongoose from 'mongoose'

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const getOneNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.noteID
  try {
    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, 'Invalid note ID')
    }
    const note = await NoteModel.findById(noteID).exec()
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

interface CreateNoteBody {
  title?: string
  text?: string
}
export const createNotes: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title
  const text = req.body.text
  try {
    if (!title) throw createHttpError(400, 'Note must have a title!')
    const newNote = await NoteModel.create({ title: title, text: text })
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}
