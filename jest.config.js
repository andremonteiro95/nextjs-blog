module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: './coverage',
};
