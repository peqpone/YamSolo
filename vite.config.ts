import { fileURLToPath, URL } from 'node:url';

import {configDefaults, defineConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  assetsInclude: ['src/graphics/dice/**/*.svg'],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      clean: true,
      reporter: ['html', 'text-summary'],
      include: ['src/**.{js,vue,ts}', 'src/**/**.{js,vue,ts}'],
      exclude: [
        'src/**.spec.js',
        'src/**/**.spec.js',
        'src/__tests__',
        'src/coverage',
        'src/**/__tests__',
        'src/router/index.ts',
        'src/main.ts',
        'src/App.vue',
      ],
      thresholds: {
        autoUpdate: true,
        statements: 82.36,
        branches: 96.35,
        functions: 84.21,
        lines: 82.36,
      },
    },
  },
});