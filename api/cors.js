const path = require('path');
const cors_proxy = require("cors-anywhere").createServer({
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false
  },
  helpFile: path.resolve(__dirname, '../help.txt'),
});

module.exports = (req, res) => {
  const _url = decodeURIComponent(req.url).replace(/\?/, '');
  req.url = `${_url || ''}`;
  cors_proxy.emit("request", req, res);
};
