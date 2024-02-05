import mongoose, { Document, Schema } from 'mongoose';

export interface UserFeaturePermissionDocument extends Document {
  userId: Schema.Types.ObjectId;
  featureId: Schema.Types.ObjectId;
  permissionId: Schema.Types.ObjectId;
}

const schema = new Schema<UserFeaturePermissionDocument>({
  id: {
    type: mongoose.Types.ObjectId,
    generated: true,
    trim: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  featureId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  permissionId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
})

export const UserRole = mongoose.model<UserFeaturePermissionDocument>('UserRole', schema)
