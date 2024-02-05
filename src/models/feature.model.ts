import mongoose, { Schema, model, Document } from 'mongoose'
export interface FeatureAttribute extends Document {
    name: string,
}

const schema = new Schema<FeatureAttribute>(
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

export const Feature = model<FeatureAttribute>('Feature', schema)