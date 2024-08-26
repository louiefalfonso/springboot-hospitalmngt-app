import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line no-undef
const baseUriDev = process.env.VITE_BASE_URI_DEV;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: baseUriDev, // Use the variable here
        changeOrigin: true,
        secure: false,
        cors: true,
        configure: (proxy, req, res) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
        },
      },
      "/auth": {
        target: baseUriDev,
        changeOrigin: true,
        secure: false,
        cors: true,
        configure: (proxy, req, res) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
        },
      },
    },
  },
});
