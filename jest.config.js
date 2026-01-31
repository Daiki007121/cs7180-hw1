module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  projects: [
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/challenge1/**/*.test.ts', '**/challenge3/**/*.test.ts'],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
    },
    {
      displayName: 'jsdom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/challenge2/**/*.test.tsx'],
      setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
    }
  ]
};
