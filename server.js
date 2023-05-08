const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const path = require('path');

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://oauth.mail.ru',
  changeOrigin: true,
  pathRewrite: { '^/api': '/token' },
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'https://master--snazzy-palmier-903703.netlify.app';
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});
