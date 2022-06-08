import { Schema, model, Document } from 'mongoose';
import { IAccount } from './account';
import { IBill } from './bill';
import { ICategory } from './category';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface ITransaction extends Document {
  amount: number;
  bill?: string | IBill;
  category?: string | ICategory;
  date: string | Date;
  billDate?: string;
  description?: string;
  destination?: string | IAccount;
  isIncome: boolean;
  source?: string | IAccount;
  transactionType: string;
  user: string | IUser;
}

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  bill: { type: ObjectId, ref: 'Bill' },
  category: { type: ObjectId, ref: 'Category' },
  date: { type: Date, default: new Date() },
  billDate: String,
  description: String,
  destination: { type: ObjectId, ref: 'Account' },
  isIncome: { type: Boolean, required: true, default: false },
  source: { type: ObjectId, ref: 'Account' },
  transactionType: {
    type: String,
    required: true,
    enum: ['expense', 'deposit'],
    default: 'expense'
  },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<ITransaction>('Transaction', TransactionSchema);
