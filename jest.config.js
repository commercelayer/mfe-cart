module.exports = {
  roots: ["<rootDir>/components", "<rootDir>/utils"],
  transform: {
    "^.+\\.ts(x)?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true, // skipping type-checking so we spead-up CI. Type-checking will be done during building step
    },
  },
  testEnvironment: "jsdom",
  maxWorkers: 1, // works better for CI
  testRegex: "(.*|(\\.|/))\\.(test|spec).ts(x)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/jest.env.config.js"],
  // map TS path aliases to be used also in test files
  moduleNameMapper: {
    "#components/(.*)": "<rootDir>/components/$1",
    "#utils/(.*)": "<rootDir>/utils/$1",
    "public/(.*)": "<rootDir>/public/$1",
  },
}
