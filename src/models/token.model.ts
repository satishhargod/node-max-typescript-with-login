import mongoose, { Document, Schema, model } from 'mongoose';
export interface TokenAttribute extends Document {
  id: typeof Schema.Types.ObjectId;
  userId: typeof Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const schema = new Schema<TokenAttribute>({
  id: {
    type: mongoose.Types.ObjectId,
    generated: true,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export const Token = model<TokenAttribute>('token', schema);
