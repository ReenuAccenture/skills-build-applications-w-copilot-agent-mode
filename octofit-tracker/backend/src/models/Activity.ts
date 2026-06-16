import { Schema, model, Document } from 'mongoose';

interface IActivity extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  title: string;
  description: string;
  duration: number;
  calories: number;
  distance?: number;
  intensity: 'low' | 'medium' | 'high';
  points: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking', 'sports', 'other'],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: '',
      maxlength: 500,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    distance: {
      type: Number,
      default: null,
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IActivity>('Activity', activitySchema);
