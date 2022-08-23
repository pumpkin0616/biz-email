import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { injectHtml } from 'vite-plugin-html';

export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
    host: '0.0.0.0',//ip地址
    port: 3001, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
  },
  resolve: {
    alias: {
      'biz-email-editor/lib/style.css': path.resolve(
        __dirname,
        'package.json'
      ), // 没有用的，只是防止css 404报错
      'biz-email-extensions/lib/style.css': path.resolve(
        __dirname,
        'package.json'
      ), // 没有用的，只是防止css 404报错
      react: path.resolve('./node_modules/react'),
      'react-final-form': path.resolve(
        __dirname,
        './node_modules/react-final-form'
      ),
      '@demo': path.resolve(__dirname, './src'),
      '@extensions': path.resolve('../packages/biz-email-extensions/src'),
      '@core': path.resolve('../packages/biz-email-core/src'),
      '@arco-themes': path.resolve('./node_modules/@arco-themes'),
      '@': path.resolve('../packages/biz-email-editor/src'),
      'biz-email-core': path.resolve(
        '../packages/biz-email-core/src/index.tsx'
      ),
      'biz-email-editor': path.resolve(
        '../packages/biz-email-editor/src/index.tsx'
      ),
      'biz-email-extensions': path.resolve(
        '../packages/biz-email-extensions/src/index.tsx'
      ),
      '@arco-design/web-react/dist/css/arco.css': path.resolve(
        './node_modules/@arco-design/web-react/dist/css/arco.css'
      ),
    },
  },

  define: {},
  esbuild: {
    jsxInject: 'import "@arco-design/web-react/dist/css/arco.css";',
  },
  build: {
    minify: 'terser',
    manifest: true,
    sourcemap: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/node_modules\/html2canvas\/.*/.test(id)) {
            return 'html2canvas';
          }
          if (/\/node_modules\/lodash\/.*/.test(id)) {
            return 'lodash';
          }
          if (/\/node_modules\/mjml-browser\/.*/.test(id)) {
            return 'mjml-browser';
          }
          if (/biz-email.*/.test(id)) {
            return 'biz-email-editor';
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    reactRefresh(),

    injectHtml({
      data: {
        buildTime: `<meta name="updated-time" content="${new Date().toUTCString()}" />`,
      },
    }),
  ].filter(Boolean),
});
