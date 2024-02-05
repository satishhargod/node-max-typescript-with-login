import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import mongoose, { Document, Schema, model } from 'mongoose';
config()
const SALT_WORK_FACTOR = 10;
export interface UserDocument extends Document {
  id: typeof Schema.Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  avatarurl: string;
  type: string;
  status: boolean;
  deletedAt: Date;
 // userrole: mongoose.Types.ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    id: {
      type: mongoose.Types.ObjectId,
      generated: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: Boolean,
      trim: true,
      default: true,
    },
    deletedAt: {
      type: Date,
      trim: true,
      default: null,
    },
    // userrole: [{
    //   type: mongoose.Types.ObjectId,
    //   ref: 'UserRole',
    // }],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.virtual('avatarUrl').get(function () {
  return process.env.NODE_URL + 'api/images/'+this.avatar;
});
userSchema.set('toJSON', { virtuals: true, getters: true });

export const User = model<UserDocument>('User', userSchema);
