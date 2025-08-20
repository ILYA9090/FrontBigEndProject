import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true, // автоматически открывать браузер
  },
  plugins: [svgr({ exportAsDefault: true }), react(), tsconfigPaths()],
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:8000'),
    __PROJECT__: JSON.stringify('frontend'),
  },
});
