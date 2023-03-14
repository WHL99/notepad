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

export const getNote: RequestHandler = async (req, res, next) => {
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
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title
  const text = req.body.text
  try {
    if (!title) {
      throw createHttpError(400, 'Note must have a title!')
    }

    const newNote = await NoteModel.create({ title: title, text: text })
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

interface UpdateNoteParams {
  noteID: string
}
interface UpdateNoteBody {
  title?: string
  text?: string
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteID = req.params.noteID
  const newTitle = req.body.title
  const newText = req.body.text
  try {
    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, 'Invalid note ID')
    }

    if (!newTitle) {
      throw createHttpError(400, 'Note must have a title!')
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(noteID, {
      title: newTitle,
      text: newText,
    })
    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.noteID
  const title = req.body.title
  const text = req.body.text
  try {
    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, 'Invalid note ID')
    }

    await NoteModel.findByIdAndDelete(noteID, {
      title: title,
      text: text,
    })

    // 沒有回傳JSON
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
