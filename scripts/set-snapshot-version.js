const fs = require('fs');
const semver = require('semver'); // You'll need to `yarn add --dev semver`

const pkgPath = './package.json';
if (!fs.existsSync(pkgPath)) {
    console.error(`Error: ${pkgPath} not found.`);
    process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version;
// const pipelineIID = process.env.CI_PIPELINE_IID;

// if (!pipelineIID) {
//     console.error("Error: CI_PIPELINE_IID environment variable is not set.");
//     process.exit(1);
// }

// const targetPreidLabel = `SNAPSHOT.${pipelineIID}`;
const targetPreidLabel = `SNAPSHOT.`;
let newVersionToSet;

const prereleaseComponents = semver.prerelease(currentVersion);

// Case 1: Current version is X.Y.Z-SNAPSHOT.something (e.g., 1.2.3-SNAPSHOT.0 or 1.2.3-SNAPSHOT.122)
// We want to update it to X.Y.Z-SNAPSHOT.<new_iid>
if (prereleaseComponents && prereleaseComponents.length > 0 && String(prereleaseComponents[0]).startsWith('SNAPSHOT')) {
    newVersionToSet = `${semver.major(currentVersion)}.${semver.minor(currentVersion)}.${semver.patch(currentVersion)}-${targetPreidLabel}`;
}
// Case 2: Current version is X.Y.Z (a stable version)
// We want X.Y.(Z+1)-SNAPSHOT.<new_iid>.0 (Yarn's default --prerelease behavior)
// Case 3: Current version is X.Y.Z-OTHER_PREID.1 (a different type of pre-release)
// We want X.Y.Z-OTHER_PREID.1-SNAPSHOT.<new_iid>.0 (Yarn's default behavior for adding a new preid type)
// For Cases 2 and 3, this script will output nothing, and the CI job will use the original yarn command.

if (newVersionToSet) {
    console.log(newVersionToSet);
}
