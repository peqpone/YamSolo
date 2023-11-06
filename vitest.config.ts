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
          exclude: ['src/**.spec.js', 'src/**/**.spec.js', 'src/__tests__', 'src/coverage', 'src/**/__tests__'],
          thresholdAutoUpdate: true,
          statements: 77.16,
          branches: 94.28,
          functions: 80,
          lines: 77.16,
        },
      },
    }),
);
