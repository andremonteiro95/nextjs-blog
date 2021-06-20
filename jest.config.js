module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  testEnvironment: 'jsdom',
};
