import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  joinDate: Date;
  teams: Schema.Types.ObjectId[];
  totalPoints: number;
  streakDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    totalPoints: {
      type: Number,
      default: 0,
    },
    streakDays: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('User', userSchema);
