import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';
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
    globals: true,
    // deps: { inline: ['@vue', 'vue', 'jsdom'] },
    coverage: {
      reporter: ['html', 'text-summary'],
      include: ['src/**.{js,vue,ts}', 'src/**/**.{js,vue,ts}'],
      exclude: ['src/**.spec.js', 'src/**/**.spec.js', 'src/__tests__', 'src/**/__tests__'],
      clean: true,
      all: true,
      statements: 45,
      branches: 86,
      functions: 59,
      lines: 48,
    },
    environment: 'jsdom',
    root: 'src',
  },
});
