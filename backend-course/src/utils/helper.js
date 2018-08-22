const path = require('path');
const fs = require('fs');
const URL_SERVER = (req, url) => (`${req.protocol}://${req.get('host')}/api/${url}`);


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);


const isFolderAndMkdir = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
};

module.exports = {
  URL_SERVER,
  resolveApp,
  isFolderAndMkdir,
};
