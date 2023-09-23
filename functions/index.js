const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const functions =require("firebase-functions")
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this to specific origins if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const apiProxy = createProxyMiddleware('/maps', {
  target: 'https://maps.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/maps': '',  // Remove the '/maps' from the request path
  },
});

app.use(apiProxy);



exports.api = functions.https.onRequest(app);