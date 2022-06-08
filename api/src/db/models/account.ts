import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface IAccount extends Document {
  accountType: string;
  balance: number;
  description?: string;
  name: string;
  status: string;
  user: string | IUser
}

const AccountSchema = new Schema({
  accountType: {
    type: String,
    required: true,
    enum: ['asset', 'debt'],
    default: 'debt'
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  description: String,
  name: {
    type: String,
    required: true,
    default: 'New Account'
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'closed'],
    default: 'active'
  },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<IAccount>('Account', AccountSchema);
