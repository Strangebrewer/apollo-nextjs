import { Schema, model, Document } from 'mongoose';
import { ITemplate } from './template';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface ICategory extends Document {
  name: string;
  description?: string;
  transactionTemplate?: string | ITemplate;
  user: string | IUser;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  transactionTemplate: { type: ObjectId, ref: 'TransactionTemplate' },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<ICategory>('Category', CategorySchema);
