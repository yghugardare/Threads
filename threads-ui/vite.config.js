import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy :{
      // Avoiding CORS Errors
      "/api" : {
        // requests to /api will be forwarded to this target
        target : "http://localhost:8000",
        // makes the server think the request is coming directly from the proxy server.
        // by changing the  origin of the host header to the target URL
        changeOrigin : true,
        // used in development environments where HTTPS might not be strictly enforced.
        // false = allow for http 
        // true = not allow for http , only https
        secure: false,
      }
    }
  },
});
