/* eslint-disable no-console */
process.env.NODE_ENV = 'production';
process.on('unhandledRejection', (err) => { throw err; });
const fs = require('fs-extra');
const zipFolder = require('zip-folder');
const glob = require('glob');
const git = require('simple-git')();
const { resolveApp, isFolderAndMkdir } = require('../src/utils/helper');
const logger = require('../src/config/winston');

const pkg = require(resolveApp('package.json'));
const appBuildVirtual = resolveApp('build/virtual');
const appBuild = resolveApp('build');
const appPublic = resolveApp('src/public');

function prepareBuildDir(buildInfo) {
  return new Promise((resolve, reject) => {
    try {
      glob(`${resolveApp('archive')}/${pkg.name}-*.zip`, {}, (err, files) => {
        files.forEach((fileName) => {
          logger.log('info', `Delete: ${fileName}`);
          fs.unlink(fileName);
        });
      });
      fs.emptyDirSync(appBuildVirtual);
      const publicDir = `${appBuildVirtual}/src/public`;
      fs.copySync(appPublic, publicDir, {
        dereference: true,
      });
      fs.copySync('./package.json', `${appBuildVirtual}/package.json`);
      fs.writeFileSync(`${publicDir}/buildinfo/data.json`, JSON.stringify(buildInfo[1], null, 2));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function generateBuildInfo(previousFileSizes) {
  const buildUrl = process.argv[2] || 'https://github.com/remynguyen96/node-boilerplate/tree/courseMysql';
  const buildBranch = process.argv[3] || 'courseMysql';
  return new Promise((resolve) => {
    git.revparse(['HEAD'], (errrevparse, hash) => {
      let commits = [];
      let lastHash = {};
      if (fs.existsSync('lastBuiltHash.json')) {
        lastHash = fs.readJSONSync('lastBuiltHash.json');
        if (lastHash[buildBranch]) {
          git.log([lastHash[buildBranch]], (errlog, logs) => {
            commits = logs.all.filter((log) => !log.message.toLowerCase().includes('merge')).slice(0, 3);
          });
        }
      }
      const formatHash = hash.replace('\n', '');
      lastHash = Object.assign(lastHash, {
        [buildBranch]: formatHash,
      });
      fs.writeFileSync('lastBuiltHash.json', JSON.stringify(lastHash, null, 4));
      git.branchLocal((errbranch, branch) => {
        const { current } = branch;
        resolve([previousFileSizes, {
          build_url: buildUrl,
          current_commit: formatHash,
          branch: current,
          version: pkg.version,
          commits,
        }]);
      });
    });
  });
}

function packBuildDir() {
  return new Promise((resolve, reject) => {
    fs.copySync(appBuildVirtual, appBuild, {
      dereference: true,
    });
    fs.removeSync(appBuildVirtual);
    const dirArchive = `${resolveApp('')}/archive/`;
    isFolderAndMkdir(dirArchive);
    const zipName = `${resolveApp('archive')}/${pkg.name}-${pkg.version}.zip`;
    zipFolder(appBuild, zipName, (err) => {
      if (err) {
        logger.log('error', `Cannot create zip file! ${err}`);
        reject();
      } else {
        logger.log('info', `Created zip file: ${zipName}\n`);
        resolve();
      }
    });
  });
}

function buildFail(err) {
  logger.log('error', 'Failed to compile.\n');
  logger.log('error', `${err.message || err}\n`);
  process.exit(1);
}


(async (app) => {
  try {
    const generateBuild = await generateBuildInfo(app);
    const prepareBuild = await prepareBuildDir(generateBuild);
    const zipBuildApp = await packBuildDir(prepareBuild);
    return zipBuildApp;
  } catch (error) {
    return buildFail(error);
  }
})(appBuildVirtual);
