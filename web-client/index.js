const express = require('express');
const next = require('next');
require('dotenv').config();

const devApiUrl = 'http://localhost:3001' || process.env.DEV_API_URL;
const port = 3000;

const env = process.env.NODE_ENV;
const dev = env !== 'production';

const devProxy = {
    '/api/': {
        target: devApiUrl,
        pathRewrite: { '^/api/v1': '/' },
        changeOrigin: true,
    },
};

const app = next({
    dev,
});

const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        if (dev && devProxy) {

            const { createProxyMiddleware } = require('http-proxy-middleware');

            Object.keys(devProxy).map(context => {
                server.use(createProxyMiddleware(context, devProxy[context]));
            });
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => handle(req, res));
        server.listen(port, err => {
            if (err) {
                throw err;
            }

            console.log(`> Ready on port ${port} [${env}]`);
        });
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server');
        console.log('Error; index.js;', err);
    });
