import express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const app = express();

app.use('**', createProxyMiddleware({ target:  "http://localhost:7894/springboot2webapp", changeOrigin: true,secure:false }));
app.listen(3000);