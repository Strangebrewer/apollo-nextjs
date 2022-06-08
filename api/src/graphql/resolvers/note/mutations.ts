import { AuthenticationError } from "apollo-server-express";
import { Note } from "../../../db/models";
import { Ctx, NotePayload } from "../../../types";
import { AUTH_ERROR_MESSAGE, NotFoundError } from "../../../utils/errors";

const noteMutations = {
  createNote: async (_: unknown, { note }: NotePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    note.user = user._id;
    let newNote = new Note(note);
    newNote = await newNote.save();

    return newNote;
  },

  updateNote: async (_: unknown, { id, note }: NotePayload, { loaders, user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);

    const found = await Note.findById(id);
    if (!found) throw new NotFoundError('note not found');

    let updated = Object.assign(found, note);
    updated = await updated.save();

    return loaders.note.one(updated._id);
  },

  deleteNote: async (_: unknown, { id }: NotePayload, { user }: Ctx) => {
    if (!user) throw new AuthenticationError(AUTH_ERROR_MESSAGE);
    return await Note.findOneAndDelete({ _id: id });
  }
};

export default noteMutations;
