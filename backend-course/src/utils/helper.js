const URL_SERVER = (req, url) => (`${req.protocol}://${req.get('host')}/api/${url}`);

module.exports = {
  URL_SERVER,
};
