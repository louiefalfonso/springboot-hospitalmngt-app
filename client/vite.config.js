import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "import.meta.env.VITE_BASE_URI_DEV",
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
        target: "import.meta.env.VITE_BASE_URI_DEV",
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
