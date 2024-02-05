import mongoose, { Schema, model, Document } from 'mongoose'
export interface PermissionAttribute extends Document {
    name: string,
}

const schema = new Schema<PermissionAttribute>(
  {
    id: {
      type: mongoose.Types.ObjectId,
      generated: true,
      trim: true,
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
    },
  }
)

export const Permission = model<PermissionAttribute>('Permission', schema)