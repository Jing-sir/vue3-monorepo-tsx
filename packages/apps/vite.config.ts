import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve, dirname } from 'node:path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

const env = dotenv.config().parsed;
// https://vitejs.dev/config/

export default defineConfig({
  base: env.VITE_PUBLIC_PATH,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Vue App',
        short_name: 'VueApp',
        description: 'My Vue 3 and Vite PWA application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: ['any', 'maskable'], // testing new type declaration
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      client: {
        installPrompt: true,
        // you don't need to include this: only for testing purposes
        // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
        periodicSyncForUpdates: 24 * 60 * 60 * 1000,
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: '/',
        navigateFallbackAllowlist: [/^\/$/],
        type: 'module',
      },
    }),
    AutoImport({
      // 自动导入 Vue 相关的 API，比如 `ref`, `reactive`, `toRef` 等
      imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],

      // 自动导入你项目中的文件，比如 `utils` 文件夹
      dirs: [
        './src/store',
        './src/utils',
        './src/use', // 你可以添加多个路径
      ],
      // 生成 `auto-imports.d.ts` 全局声明文件
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // 自动导入 Vue 组件
      dirs: ['./src/components'],
      // 生成 `components.d.ts` 全局声明文件
      dts: 'src/components.d.ts',
      // 可以根据需要启用或禁用深度导入
      deep: true,
    }),
  ],
  define: {
    'process.env': process.env,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  server: {
    port: 60001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
