import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPath from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";
import imagemin from "vite-plugin-imagemin";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tsConfigPath(),
      viteCompression({
        algorithm: "gzip",
      }),
      imagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 75,
        },
      }),
    ],
    base: "/",
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    server: {
      host: "localhost",
      port: 3010,
      configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/favicon.ico") {
            res.statusCode = 204;
            res.end();
          } else {
            next();
          }
        });
      },
    },
  };
});
