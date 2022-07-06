// @ts-check
const { execSync } = require("child_process");
const { targetDirectories } = require("./targetDirectories");
const { targetWords } = require("./targetWords");
const OPTIONS = {
  showIfFound: true,
  showIfNotFound: false,
};

targetWords.forEach((word) => {
  let found = false;
  targetDirectories.forEach((directory) => {
    if (found) return;
    const stdout = execSync(
      `find ${directory} -type f -print | xargs grep '${word}'`
    );

    found = stdout.toString().split(word).length > 2;

    if (found && OPTIONS.showIfFound) {
      console.log(`FOUND ${word} in ${directory}`);
    } else if (!found && OPTIONS.showIfNotFound) {
      console.log(`NOT FOUND: ${word} in ${directory}`);
    }
  });
});
