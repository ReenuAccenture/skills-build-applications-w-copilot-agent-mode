import { Schema, model, Document } from 'mongoose';

interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    rest: number;
  }>;
  targetMuscles: string[];
  caloriesBurned: number;
  suggestedFor: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 5,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
          min: 1,
        },
        reps: {
          type: Number,
          required: true,
          min: 1,
        },
        rest: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    targetMuscles: [
      {
        type: String,
      },
    ],
    caloriesBurned: {
      type: Number,
      required: true,
      min: 0,
    },
    suggestedFor: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IWorkout>('Workout', workoutSchema);
