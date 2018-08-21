/* eslint-disable no-console */
process.env.NODE_ENV = 'production';
process.on('unhandledRejection', (err) => { throw err; });
const fs = require('fs-extra');
const zipFolder = require('zip-folder');
const glob = require('glob');
const git = require('simple-git')();
const path = require('path');
const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} = require('react-dev-utils/FileSizeReporter');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const pkg = require(resolveApp('package.json'));
const appBuild = resolveApp('build');
const appPublic = resolveApp('public');
const appHtml = resolveApp('public/index.html');
const useYarn = fs.existsSync('yarn.lock');

function prepareBuildDir(buildInfo) {
  return new Promise((resolve, reject) => {
    try {
      glob(`${pkg.name}-*.zip`, {}, (err, files) => {
        files.forEach((fileName) => {
          console.log(`Delete: ${fileName}`);
          fs.unlink(fileName);
        });
      });
      fs.emptyDirSync(appBuild);
      fs.copySync(appPublic, appBuild, {
        dereference: true,
        filter: (file) => (file !== appHtml),
      });
      fs.copySync('./package.json', 'build/package.json');
      fs.copySync('./buildinfo', 'build/buildinfo');
      fs.writeFileSync('./build/buildinfo/data.json', JSON.stringify(buildInfo[1], null, 2));
      resolve(buildInfo[0]);
    } catch (err) {
      reject(err);
    }
  });
}


function generateBuildInfo(previousFileSizes) {
  const buildNo = process.argv[2] || '';
  const buildUrl = process.argv[3] || '';
  const buildBranch = process.argv[4] || '';
  return new Promise((resolve) => {
    git.revparse(['HEAD'], (errrevparse, hash) => {
      let commits = [];
      let lastHash = {};
      if (fs.existsSync('lastBuiltHash.json')) {
        lastHash = fs.readJSONSync('lastBuiltHash.json');
        if (lastHash[buildBranch]) {
          console.log(lastHash[buildBranch]);
          // git.log([`${lastHash[buildBranch]}..${hash.replace('\n', '')}`], (errlog, logs) => {
            // commits = logs.all.filter((log) => { return !log.message.toLowerCase().includes('merge'); });
          // });
        }
      }
      lastHash = Object.assign(lastHash, {
        [buildBranch]: hash.replace('\n', ''),
      });
      fs.writeFileSync('lastBuiltHash.json', JSON.stringify(lastHash, null, 4));
      git.branchLocal((errbranch, branch) => {
        resolve([previousFileSizes, {
          build_no: buildNo,
          build_url: buildUrl,
          current_commit: hash.replace('\n', ''),
          branch: buildBranch || branch.current,
          version: pkg.version,
          commits,
        }]);
      });
    });
  });
}

function printResult({ stats, previousFileSizes, warnings }) {
  return new Promise((resolve) => {
    if (warnings && warnings.length) {
      console.log('Compiled with warnings.\n');
      console.log(warnings.join('\n\n'));
      console.log('Search for the keywords to learn more about each warning.');
      console.log('To ignore, add to the line before.');
    } else {
      console.log('Compiled successfully.\n');
    }

    // console.log('File sizes after gzip:\n');
    // printFileSizesAfterBuild(stats, previousFileSizes);
    console.log(stats, 'stats');
    console.log(previousFileSizes, 'previousFileSizes');

    // const buildFolder = path.relative(process.cwd(), appBuild);
    // printHostingInstructions(
    //   pkg,
    //   appPublic,
    //   buildFolder,
    //   useYarn
    // );
    resolve();
  });
}

function packBuildDir() {
  return new Promise((resolve, reject) => {
    const zipName = `./archive/${pkg.name}-${pkg.version}.zip`;
    zipFolder(appBuild, zipName, (err) => {
      if (err) {
        console.log('Cannot create zip file! ', err);
        reject();
      } else {
        console.log(`Created zip file: ${zipName}\n`);
        resolve();
      }
    });
  });
}

function buildFail(err) {
  console.log('Failed to compile.\n');
  console.log(`${err.message || err}\n`);
  process.exit(1);
}

measureFileSizesBeforeBuild(appBuild)
  .then(generateBuildInfo)
//   .then(prepareBuildDir)
  // .then(printResult)
  // .then(packBuildDir)
  .catch(buildFail);

  // measureFileSizesBeforeBuild(paths.appBuild)
  // .then(generateBuildInfo)
  // .then(prepareBuildDir)
  // .then(build)
  // .then(printResult)
  // .then(packBuildDir)
  // .catch(buildFail);


// measureFileSizesBeforeBuild(appBuild).then((previousFileSizes) => {
  // console.log(previousFileSizes, 'previousFileSizes');
  // return cleanAndRebuild().then(webpackStats => {
    // printFileSizesAfterBuild(webpackStats, previousFileSizes, buildFolder);
  // });
// });