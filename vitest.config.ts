import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        environment: 'jsdom',
        globals: true,
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        coverage: {
          all: true,
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
          thresholdAutoUpdate: true,
          statements: 82.36,
          branches: 96.35,
          functions: 84.21,
          lines: 82.36,
        },
      },
    }),
);
