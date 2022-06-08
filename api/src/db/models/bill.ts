import { Schema, model, Document } from 'mongoose';
import { IAccount } from './account';
import { ICategory } from './category';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface IBill extends Document {
  amount: number;
  category?: string | ICategory;
  description?: string;
  dueDay: number;
  name: string;
  destination?: string | IAccount;
  source: string | IAccount;
  status: string;
  user: string | IUser;
}

const BillSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: ObjectId, ref: 'Category' },
  source: { type: ObjectId, ref: 'Account' },
  destination: { type: ObjectId, ref: 'Account' },
  description: String,
  dueDay: { type: Number, required: true }, // day of the month the bill is due
  name: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<IBill>('Bill', BillSchema);
