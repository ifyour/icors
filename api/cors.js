const options = {
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
};
const cors_proxy = require('./lib/cors-anywhere').createServer(options);


module.exports = (req, res) => {

  // fix: Error: getaddrinfo ENOTFOUND https
  const url = Object.assign(req, { url: req.url.replace(':/', '://') });

  cors_proxy.emit('request', url, res);
};
