import fs from 'fs-extra'
import pico from 'picocolors'

import { defineConfig } from 'tsup'

import { dependencies } from './package.json'
import path from 'path'

// Temporary workaround until esbuild supports glob imports.
// https://github.com/evanw/esbuild/pull/2508
const getTemplates = () => {
  const templates = fs.readdirSync(path.join(__dirname, 'templates'))

  let src = 'export default ['

  templates.forEach((template) => {
    const templatePath = path.join(__dirname, 'templates', template)
    if (!fs.lstatSync(templatePath).isDirectory()) return
    if (!fs.existsSync(path.join(templatePath, '_meta.ts'))) {
      console.log(
        pico.red(
          [
            `Unable to find \`_meta.ts\` for template "${template}".`,
            '',
            'Please make sure that you have a file named `_meta.ts` in the root of your template folder.',
            '',
            'Example:',
            '',
            `${path.join(templatePath, '_meta.ts')}`,
            '```',
            "import { createTemplate } from '../createTemplate'",
            '',
            'export default createTemplate({',
            '  name: "example-template",',
            '  title: "Example Template",',
            '  description: "An example template using wagmi",',
            '})',
            '```',
          ].join('\n'),
        ),
      )
      process.exit(1)
    }
    src += `\n  () => import('../../templates/${template}/_meta'),`
  })
  src += '\n]\n'
  fs.writeFileSync(
    path.join(__dirname, 'src/generated/templateImports.ts'),
    src,
  )
  return templates
}

getTemplates()

export default defineConfig({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  external: Object.keys(dependencies),
  format: ['esm'],
  platform: 'node',
  ignoreWatch: ['**/generated/**'],
  async onSuccess() {
    getTemplates()
  },
})
