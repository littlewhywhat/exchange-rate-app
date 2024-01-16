module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/setup/jest.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native/.*))',
  ],
};
