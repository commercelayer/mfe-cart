module.exports = {
  reject: ["pnpm"],
  filterResults: (name, { upgradedVersionSemver }) => {
    if (
      (name === "@types/iframe-resizer" &&
        Number.parseInt(upgradedVersionSemver?.major) >= 4) ||
      (name === "@types/react" &&
        Number.parseInt(upgradedVersionSemver?.major) >= 19) ||
      (name === "@types/react-dom" &&
        Number.parseInt(upgradedVersionSemver?.major) >= 19) ||
      (name === "react" &&
        Number.parseInt(upgradedVersionSemver?.major) >= 18) ||
      (name === "react-dom" &&
        Number.parseInt(upgradedVersionSemver?.major) >= 18) ||
      (name === "tailwindcss" &&
        Number.parseInt(upgradedVersionSemver?.major) >= 4)
    ) {
      return false
    }

    return true
  },
}
