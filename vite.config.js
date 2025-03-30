import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    mdx(),
    svgr({
      // Options for vite-plugin-svgr
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: true,
        titleProp: true,
      },
      include: '**/*.svg',
    })
  ],

  esbuild: {
    jsx: 'automatic',
    include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      css: {
        importLoaders: 1,
      },
    },
  },

  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.css', '.module.css', '.svg']
  }
});