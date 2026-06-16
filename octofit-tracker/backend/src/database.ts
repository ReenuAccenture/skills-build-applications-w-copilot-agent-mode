/**
 * Database Connection Module
 * Handles MongoDB/Mongoose connection setup and lifecycle management
 */

import mongoose from 'mongoose';
import { config } from './config';

/**
 * Initialize MongoDB connection
 * @returns Promise that resolves when connected
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log(`✓ Connected to MongoDB at ${config.mongodbUri}`);

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB reconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
};

/**
 * Disconnect from MongoDB
 * @returns Promise that resolves when disconnected
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Failed to disconnect from MongoDB:', error);
    throw error;
  }
};

/**
 * Get current MongoDB connection state
 * @returns boolean - true if connected
 */
export const isConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

/**
 * Get current connection state description
 * @returns string - human-readable connection state
 */
export const getConnectionState = (): string => {
  const states: { [key: number]: string } = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
};
