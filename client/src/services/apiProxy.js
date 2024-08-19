


import { createProxyMiddleware } from "http-proxy-middleware";

const apiProxy = createProxyMiddleware({
  target: "http://localhost:8080",
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

export default apiProxy