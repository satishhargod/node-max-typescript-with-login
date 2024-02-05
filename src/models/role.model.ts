import mongoose, { Document, Schema, model } from 'mongoose'
export interface RoleAttribute extends Document {
    name: string,
    slug: string
}

const schema = new Schema<RoleAttribute>(
  {
    id: {
      type: mongoose.Types.ObjectId,
      generated: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
    },
  },    
  {
    timestamps: true,
  },
)

export const Role = model<RoleAttribute>('Role', schema)