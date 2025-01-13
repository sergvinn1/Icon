import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    middlewareMode: 'html',
    setupMiddlewares: (middlewares) => {
      middlewares.use(history());
      return middlewares;
    },
  },
});