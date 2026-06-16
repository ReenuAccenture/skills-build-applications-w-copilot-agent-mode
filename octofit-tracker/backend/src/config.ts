/**
 * API Configuration
 * Provides Codespaces-aware API URL support
 */

export const getApiUrl = (): string => {
  const port = process.env.PORT || 8000;
  
  // Check if running in Codespaces
  if (process.env.CODESPACE_NAME) {
    // Format: https://username-codespace-name-port.app.github.dev
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  }
  
  // Local development
  return `http://localhost:${port}`;
};

export const getServerPort = (): number => {
  return parseInt(process.env.PORT || '8000', 10);
};

export const config = {
  port: getServerPort(),
  apiUrl: getApiUrl(),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit',
  isDevelopment: process.env.NODE_ENV !== 'production',
};
