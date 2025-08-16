import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true, // автоматически открывать браузер
  },
  optimizeDeps: {
    include: ['react-virtualized'],
    exclude: ['react-virtualized'],
  },
  plugins: [svgr({ exportAsDefault: true }), react(), tsconfigPaths()],
  //   resolve: {
  //     alias: [{ find: '@', replacement: '/src' }],
  //   },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:8000'),
    __PROJECT__: JSON.stringify('frontend'),
  },
});
