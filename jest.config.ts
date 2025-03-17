// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/src/__mocks__/fileMock.js',
  },

};

export default config;
