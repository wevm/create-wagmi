import { defineConfig } from 'tsup'

import { dependencies } from './package.json'

export default defineConfig({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  external: Object.keys(dependencies),
  format: ['esm'],
  platform: 'node',
})
