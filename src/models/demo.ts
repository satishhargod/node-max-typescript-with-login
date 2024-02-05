import { Schema, model } from 'mongoose'

export interface DemoAttribute {
  name: string
}

const schema = new Schema<DemoAttribute>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  },
)

export const Demo = model<DemoAttribute>('Demo', schema)
