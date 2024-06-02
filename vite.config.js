// vite.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
  peerDepsExternal()
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/zordon-3d.ts'),
      name: 'zordon-3d',
      // the proper extensions will be added
      fileName: 'zordon-3d',
    }
  },
})
