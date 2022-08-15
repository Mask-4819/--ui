import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'packages/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      /**
       * 自定义插入位置
       * @default: 'body-first' | 'body-last'
       */
      inject: 'body-last',
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: 'svg__icons__dom__'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@--ui': fileURLToPath(
        new URL('./packages/src/index.ts', import.meta.url)
      )
    }
  },
  optimizeDeps: {
    // include: ["**/gulpfile.js"]
  }
});
