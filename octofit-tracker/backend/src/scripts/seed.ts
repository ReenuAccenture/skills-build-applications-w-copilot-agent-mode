/**
 * Database Seed Script
 * Seed the octofit_db database with test data
 *
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedDatabase = async () => {
  try {
    console.log(`
╔════════════════════════════════════════╗
║     OctoFit Database Seed Script       ║
╚════════════════════════════════════════╝
    `);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log(`✓ Connected to MongoDB at ${MONGODB_URI}\n`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});
    console.log('✓ Data cleared\n');

    // Create sample users
    console.log('👥 Creating sample users...');
    const users = await User.create([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        password: 'hashed_password_123',
        firstName: 'Alex',
        lastName: 'Johnson',
        bio: 'Marathon enthusiast and fitness lover',
        totalPoints: 2850,
        streakDays: 15,
      },
      {
        username: 'emma_cyclist',
        email: 'emma@example.com',
        password: 'hashed_password_456',
        firstName: 'Emma',
        lastName: 'Smith',
        bio: 'Road cycling and trail biking',
        totalPoints: 2640,
        streakDays: 12,
      },
      {
        username: 'liam_gym',
        email: 'liam@example.com',
        password: 'hashed_password_789',
        firstName: 'Liam',
        lastName: 'Chen',
        bio: 'Strength training and bodybuilding',
        totalPoints: 3120,
        streakDays: 21,
      },
      {
        username: 'sofia_yoga',
        email: 'sofia@example.com',
        password: 'hashed_password_101',
        firstName: 'Sofia',
        lastName: 'Garcia',
        bio: 'Yoga instructor and wellness coach',
        totalPoints: 2410,
        streakDays: 8,
      },
      {
        username: 'marcus_swimmer',
        email: 'marcus@example.com',
        password: 'hashed_password_202',
        firstName: 'Marcus',
        lastName: 'Williams',
        bio: 'Competitive swimmer and triathlete',
        totalPoints: 2955,
        streakDays: 18,
      },
    ]);
    console.log(`✓ Created ${users.length} users\n`);

    // Create sample teams
    console.log('👥 Creating sample teams...');
    const teamData = [
      {
        name: 'Morning Runners Club',
        description: 'Early birds who love running at sunrise',
        owner: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Gym Warriors',
        description: 'Strength training enthusiasts',
        owner: users[2]._id,
        members: [users[2]._id, users[4]._id],
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic health and fitness community',
        owner: users[3]._id,
        members: [users[3]._id, users[0]._id, users[1]._id],
      },
    ] as any[];
    const teams = await Team.insertMany(teamData);
    console.log(`✓ Created ${teams.length} teams\n`);

    // Update users with team associations
    users[0].teams = [teams[0]._id, teams[2]._id];
    users[1].teams = [teams[0]._id, teams[2]._id];
    users[2].teams = [teams[1]._id];
    users[3].teams = [teams[2]._id];
    users[4].teams = [teams[1]._id];
    await User.updateMany({}, { teams: null });
    for (const user of users) {
      await user.save();
    }

    // Create sample activities
    console.log('🏃 Creating sample activities...');
    const activityData = [
      {
        user: users[0]._id,
        type: 'running',
        title: 'Morning 10K Run',
        description: 'Easy pace morning run through the park',
        duration: 50,
        calories: 520,
        distance: 10,
        intensity: 'medium',
        points: 250,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[0]._id,
        type: 'running',
        title: 'Speed Intervals',
        description: '5x 1km intervals with 2 min rest',
        duration: 45,
        calories: 580,
        distance: 8.5,
        intensity: 'high',
        points: 290,
        date: new Date(),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        title: 'Mountain Trail Ride',
        description: 'Technical trail biking at the local park',
        duration: 90,
        calories: 720,
        distance: 25,
        intensity: 'high',
        points: 360,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[2]._id,
        type: 'gym',
        title: 'Chest and Triceps Workout',
        description: 'Heavy compound lifts followed by isolation work',
        duration: 75,
        calories: 480,
        intensity: 'high',
        points: 240,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[3]._id,
        type: 'yoga',
        title: 'Morning Vinyasa Flow',
        description: '60-minute power yoga session',
        duration: 60,
        calories: 240,
        intensity: 'medium',
        points: 180,
        date: new Date(),
      },
      {
        user: users[4]._id,
        type: 'swimming',
        title: 'Lap Swimming Session',
        description: '2km freestyle swim',
        duration: 60,
        calories: 600,
        distance: 2,
        intensity: 'medium',
        points: 300,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        type: 'walking',
        title: 'Evening Walk',
        description: 'Leisurely walk in the neighborhood',
        duration: 40,
        calories: 200,
        distance: 3,
        intensity: 'low',
        points: 100,
        date: new Date(),
      },
    ] as any[];
    const activities = await Activity.insertMany(activityData);
    console.log(`✓ Created ${activities.length} activities\n`);

    // Create sample workouts
    console.log('💪 Creating sample workouts...');
    const workoutData = [
      {
        name: 'Full Body Strength',
        description: 'Complete full body workout targeting all major muscle groups',
        difficulty: 'intermediate',
        duration: 60,
        exercises: [
          { name: 'Squats', sets: 4, reps: 8, rest: 90 },
          { name: 'Bench Press', sets: 4, reps: 6, rest: 120 },
          { name: 'Deadlifts', sets: 3, reps: 5, rest: 120 },
          { name: 'Pull-ups', sets: 3, reps: 8, rest: 60 },
        ],
        targetMuscles: ['chest', 'back', 'legs', 'shoulders'],
        caloriesBurned: 500,
        suggestedFor: [users[2]._id],
      },
      {
        name: 'HIIT Cardio Blast',
        description: 'High intensity interval training for maximum calorie burn',
        difficulty: 'advanced',
        duration: 30,
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15, rest: 30 },
          { name: 'Mountain Climbers', sets: 3, reps: 30, rest: 30 },
          { name: 'Jump Squats', sets: 3, reps: 20, rest: 30 },
          { name: 'High Knees', sets: 3, reps: 45, rest: 30 },
        ],
        targetMuscles: ['full body', 'cardio'],
        caloriesBurned: 450,
        suggestedFor: [users[0]._id, users[1]._id],
      },
      {
        name: 'Beginner Yoga Flow',
        description: 'Gentle yoga routine perfect for beginners and recovery days',
        difficulty: 'beginner',
        duration: 45,
        exercises: [
          { name: 'Sun Salutation', sets: 5, reps: 1, rest: 0 },
          { name: 'Child Pose', sets: 2, reps: 1, rest: 60 },
          { name: 'Warrior Poses', sets: 3, reps: 1, rest: 45 },
          { name: 'Savasana', sets: 1, reps: 1, rest: 300 },
        ],
        targetMuscles: ['flexibility', 'balance', 'mind'],
        caloriesBurned: 150,
        suggestedFor: [users[3]._id, users[4]._id],
      },
      {
        name: 'Core & Stability',
        description: 'Focus on core strength and stability exercises',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Planks', sets: 3, reps: 60, rest: 60 },
          { name: 'Dead Bugs', sets: 3, reps: 12, rest: 45 },
          { name: 'Bird Dogs', sets: 3, reps: 10, rest: 45 },
          { name: 'Superman Holds', sets: 3, reps: 30, rest: 60 },
        ],
        targetMuscles: ['core', 'abs'],
        caloriesBurned: 200,
        suggestedFor: [users[0]._id, users[3]._id],
      },
    ] as any[];
    const workouts = await Workout.insertMany(workoutData);
    console.log(`✓ Created ${workouts.length} workouts\n`);

    // Create sample leaderboard entries
    console.log('🏆 Creating leaderboard entries...');
    const leaderboardData = [
      {
        user: users[2]._id,
        rank: 1,
        points: 3120,
        activities: 18,
        streakDays: 21,
      },
      {
        user: users[0]._id,
        rank: 2,
        points: 2850,
        activities: 14,
        streakDays: 15,
      },
      {
        user: users[4]._id,
        rank: 3,
        points: 2955,
        activities: 16,
        streakDays: 18,
      },
      {
        user: users[1]._id,
        rank: 4,
        points: 2640,
        activities: 12,
        streakDays: 12,
      },
      {
        user: users[3]._id,
        rank: 5,
        points: 2410,
        activities: 10,
        streakDays: 8,
      },
    ] as any[];
    const leaderboardEntries = await Leaderboard.insertMany(leaderboardData);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries\n`);

    // Summary
    console.log(`
╔════════════════════════════════════════╗
║     Database Seeding Complete! ✓       ║
╚════════════════════════════════════════╝

📊 Summary:
  • Users: ${users.length}
  • Teams: ${teams.length}
  • Activities: ${activities.length}
  • Workouts: ${workouts.length}
  • Leaderboard Entries: ${leaderboardEntries.length}

Database: octofit_db
Connection: ${MONGODB_URI}

💡 Tip: Test API endpoints to verify data creation:
  GET  http://localhost:8000/api/users
  GET  http://localhost:8000/api/teams
  GET  http://localhost:8000/api/activities
  GET  http://localhost:8000/api/leaderboard
  GET  http://localhost:8000/api/workouts

    `);

    await mongoose.disconnect();
    console.log('✓ Database connection closed\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
