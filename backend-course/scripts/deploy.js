// /* eslint-disable no-console */
// const colors = require('colors/safe');
// const fs = require('fs');
// const pkg = require('../package.json');
// const publish = require('./publish');
// const getToken = require('./login');

// const env = process.argv[2];
// const namespace = process.argv[3];
// const username = process.argv[4];
// const password = process.argv[5];
// const version = process.argv[6];
// let zipName;

// function checkArguments() {
//   return new Promise((resolve, reject) => {
//     if (process.argv.length < 6) {
//       reject('Please provide ENVIRONMENT, NAMESPACE, USERNAME and PASSWORD');
//     } else {
//       zipName = `${pkg.name}-${version || pkg.version}.zip`;
//       if (fs.existsSync(zipName)) {
//         resolve({ env, username, password });
//       } else {
//         reject(colors.red(`${zipName} does not exist!`));
//       }
//     }
//   });
// }

// function doPublish(token) {
//   return publish(env, namespace, token, zipName);
// }

// function success() {
//   console.log(`Published ${colors.green(pkg.name)} version ${colors.green(version || pkg.version)} successfully`);
// }

// function fail(err) {
//   if (err) { console.log(err); }
//   console.log(`Publishing ${colors.green(pkg.name)} version ${colors.green(version || pkg.version)} failed`);
//   process.exit(1);
// }

// checkArguments()
//   .then(getToken)
//   .then(doPublish)
//   .then(success)
//   .catch(fail);
