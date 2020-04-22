const cors_proxy = require("./lib/cors-anywhere").createServer({
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
});

module.exports = (req, res) => {
  const [_url] = Object.keys(req.query);
  req.url = `/${_url || ""}`;
  cors_proxy.emit("request", req, res);
};
