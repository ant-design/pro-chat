import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  resolve: {},
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      '@ant-design/pro-chat': path.join(__dirname, './src'),
      '@/ProChat/mocks': path.join(__dirname, './src/ProChat/mocks'),
      '@': path.join(__dirname, './src'),
    },
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
    },
  },
});
