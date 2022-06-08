import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const tempPw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10));

export interface IUser extends Document {
  _id: string;
  username: string;
  normalizedUsername: string;
  email: string;
  normalizedEmail: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  normalizedUsername: { type: String, required: true },
  email: String,
  normalizedEmail: String,
  firstName: String,
  lastName: String,
  password: { type: String, required: true, default: tempPw },
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
