import { Schema, model, Document } from 'mongoose';

interface ILeaderboard extends Document {
  user: Schema.Types.ObjectId;
  team?: Schema.Types.ObjectId;
  rank: number;
  points: number;
  activities: number;
  streakDays: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    activities: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    streakDays: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create composite index for team-based leaderboards
leaderboardSchema.index({ team: 1, points: -1 });

// Create index for global leaderboard
leaderboardSchema.index({ points: -1 });

export default model<ILeaderboard>('Leaderboard', leaderboardSchema);
