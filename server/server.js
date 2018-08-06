/* eslint-disable no-console */

const express = require('express');
const path = require('path');
const compression = require('compression');
const proxy = require('http-proxy-middleware');

const config = require('../src/config');

const app = express();
const { port, apiUrl } = config;

app.use(compression());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/build', express.static(path.resolve(__dirname, '..', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use('/v2/api/*', proxy({
  target: apiUrl,
  changeOrigin: true,
  secure: false,
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(
    `
    =====================================================
    -> Production Server Running at port ${port}...
    =====================================================
  `
  );
});

/* eslint-enable no-console */
