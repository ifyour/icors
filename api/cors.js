const options = {
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
};
const cors_proxy = require('./lib/cors-anywhere').createServer(options);


module.exports = (req, res) => {
  
  // ZEIT Bug: `/https://xxx.com` -> `/https:/xxx.com`
  req.url = req.url.replace(':/', '://');
  
  cors_proxy.emit('request', req, res);
};
