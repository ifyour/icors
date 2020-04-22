const options = {
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
};
const cors_proxy = require('./lib/cors-anywhere').createServer(options);


module.exports = (req, res) => {
  req.url = `/${req.query.url || ''}`;
  cors_proxy.emit('request', req, res);
};
