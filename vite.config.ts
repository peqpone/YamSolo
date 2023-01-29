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
      exclude: ['src/**.spec.js', 'src/**/**.spec.js', 'src/__tests__', 'src/coverage', 'src/**/__tests__'],
      clean: true,
      all: true,
      statements: 61,
      branches: 89,
      functions: 63,
      lines: 61,
    },
    environment: 'jsdom',
    root: 'src',
  },
});
