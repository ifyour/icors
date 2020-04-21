const express = require('express');
const request = require('request');
const app = express();

const port = 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'X-Final-URL');
  res.header('Cache-Control', 'public, smax-age=600, max-age=600');
  next();
});

function isURL(str) {
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  let pattern = new RegExp(regex);
  return pattern.test(str);
}

app.get('/', (req, res, next) => {
  let url = req.query.url;

  if (!url) { // If no URL specified
    res.send('URL no specified.');
    return;
  }

  if (!isURL(url)) { // if URL is not valid
    res.send('ERROR: URL NOT VALID');
    return;
  }

  req.pipe(request.get({
    url,
    timeout: 4000, // Timeout for Remote Request
  }).on('response', (response) => {
    res.header('X-Final-URL', response.request.uri.href);
  }).on('error', (err) => {
    res.status(504).send('REMOTE ERROR');
  })).pipe(res); // Send Response

});

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000 Visit http://localhost:5000`);
});
