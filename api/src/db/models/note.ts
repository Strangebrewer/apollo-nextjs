import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface INote extends Document {
  title: string;
  importance: 1 | 2 | 3 | 4;
  text: string;
  favorite: boolean;
  user: string | IUser;
}

const NoteSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  importance: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
    default: 4
  },
  favorite: { type: Boolean, required: true, default: false },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<INote>('Note', NoteSchema);
