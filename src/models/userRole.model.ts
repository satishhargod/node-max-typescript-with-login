import mongoose, { Document, Schema } from 'mongoose';

export interface UserRoleDocument extends Document {
  userId: Schema.Types.ObjectId;
  roleId: Schema.Types.ObjectId;
}

const userRoleSchema = new Schema<UserRoleDocument>({
  id: {
    type: mongoose.Types.ObjectId,
    generated: true,
    trim: true,
  },
  userId: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  roleId: {
    type: mongoose.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
})

export const UserRole = mongoose.model<UserRoleDocument>('UserRole', userRoleSchema)
