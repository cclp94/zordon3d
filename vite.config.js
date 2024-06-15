// vite.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    peerDepsExternal(),
    dtsPlugin(),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/zordon-3d.ts'),
      name: 'zordon-3d',
      fileName: (format) => `index.${format}.js`,
    }
  },
  sourceMap: true,
  emptyOutDir: true
})
