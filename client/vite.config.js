import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const baseUriDev = process.env.VITE_BASE_URI_DEV;

const apiProxy = createProxyMiddleware({
  target: baseUriDev,
  changeOrigin: true,
  pathRewrite: { "^/api": "", "^/auth": "" },
  onProxyRes: (proxyRes) => {
    console.log("Proxy response:", proxyRes);
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    proxyRes.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    proxyRes.headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization";
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization"],
    },
    proxy: {
      "/api": apiProxy,
      "/auth": apiProxy,
    },
  },
});
