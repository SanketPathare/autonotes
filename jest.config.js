
module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/^"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
