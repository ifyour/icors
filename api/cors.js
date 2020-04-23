const cors_proxy = require("cors-anywhere").createServer({
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false
  }
});

module.exports = (req, res) => {
  const _url = decodeURIComponent(req.url).replace(/\?/, '');
  req.url = `${_url || ''}`;
  cors_proxy.emit("request", req, res);
};
