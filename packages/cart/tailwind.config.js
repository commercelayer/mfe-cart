const config = require("@commercelayer/react-utils/configs/tailwind")

module.exports = {
  ...config,
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
}
