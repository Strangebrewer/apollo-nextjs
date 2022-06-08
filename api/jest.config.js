module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: [
    "<rootDir>/node_modules/reflect-metadata"
  ],
  testMatch: [
    "<rootDir>/src/**/*.spec.ts",
    "<rootDir>/src/**/?(*.)+(spec).ts"
  ]
};
