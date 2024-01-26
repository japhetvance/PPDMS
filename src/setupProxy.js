const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Specify the API endpoint
    createProxyMiddleware({
      target: 'http://localhost:5001',  // Specify the target API server
      changeOrigin: true,
    })
  );
};