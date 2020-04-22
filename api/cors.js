const options = {
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
};
const cors_proxy = require('./lib/cors-anywhere').createServer(options);


module.exports = (req, res) => {
  const [_url] = Object.keys(req.query);
  req.url = `/${_url || ''}`;
  cors_proxy.emit('request', req, res);
};
