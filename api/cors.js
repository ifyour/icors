var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

var cors_proxy = require('./lib/cors-anywhere');

cors_proxy.
  createServer({
    originWhitelist: [],
    requireHeader: [],
    removeHeaders: [],
  })
  .listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
