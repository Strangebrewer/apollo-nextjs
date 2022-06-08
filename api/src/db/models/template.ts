import { Schema, model, Document } from 'mongoose';
import { IAccount } from './account';
import { ICategory } from './category';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface ITemplate extends Document {
  amount: number;
  category?: string | ICategory;
  description?: string;
  destination?: string | IAccount;
  isIncome: boolean;
  name: string;
  source?: string | IAccount;
  transactionType: string;
  user: string |IUser;
}

const TemplateSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: ObjectId, ref: 'Category' },
  description: String,
  destination: { type: ObjectId, ref: 'Account' },
  isIncome: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  source: { type: ObjectId, ref: 'Account' },
  transactionType: {
    type: String,
    required: true,
    enum: ['expense', 'deposit'],
    default: 'expense'
  },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<ITemplate>('Template', TemplateSchema);
