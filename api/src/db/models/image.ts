import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';
const { ObjectId } = Schema.Types;

export interface IImage extends Document {
  url: string;
  lgUrl: string;
  midUrl: string;
  thumbnailUrl: string;
  publicId: string;
  data: Record<string, string | number>;
  user: string | IUser;
}

const ImageSchema = new Schema({
  url: { type: String, required: true },
  lgUrl: { type: String, required: true },
  midUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  data: {
    assetId: String,
    etag: String,
    originalFilename: String,
    path: String,
    secureUrl: String,
    height: Number,
    width: Number
  },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<IImage>('Image', ImageSchema);
