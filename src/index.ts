#!/usr/bin/env node
import { cac } from 'cac'
import cpy from 'cpy'
import { execa } from 'execa'
import fs from 'fs-extra'
import { oraPromise } from 'ora'
import pico from 'picocolors'
import { default as prompts } from 'prompts'

import packageJson from '../package.json'
import { templates } from './templates'
import {
  ValidationError,
  getPackageManager,
  notifyUpdate,
  validatePackageName,
  validateTemplateName,
} from './utils'
import path from 'path'
import { fileURLToPath } from 'url'

const log = console.log

const cli = cac(packageJson.name)
  .version(packageJson.version)
  .usage(`${pico.green('<project-directory>')} [options]`)
  .option(
    '-t, --template [name]',
    `A template to bootstrap with. Available: ${templates
      .map(({ name }) => name)
      .join(', ')}`,
  )
  .option('--npm', 'Use npm as your package manager')
  .option('--pnpm', 'Use pnpm as your package manager')
  .option('--yarn', 'Use yarn as your package manager')
  .option('--skip-git', 'Skips initializing the project as a git repository')
  .help()

const { args, options } = cli.parse(process.argv)
export type CLIOptions = typeof options

async function run() {
  if (options.help) return

  const __dirname = fileURLToPath(new URL('.', import.meta.url))
  const templatesPath = path.join(__dirname, '..', 'templates')
  const template = options.template || options.t

  // Validate template if provided
  let templateValidation = await validateTemplateName({
    isNameRequired: false,
    name: template,
    templatesPath,
  })
  if (!templateValidation.valid) throw new ValidationError(templateValidation)

  // Validate project name
  let projectName: string
  let projectPath: string
  if (args[0]) {
    projectPath = args[0].trim()
    const splitPath = projectPath.split('/')
    projectName = splitPath[splitPath.length - 1]?.trim() || ''
    log(pico.green('✔'), pico.bold(`Using project name:`), projectName)
  } else {
    const res = await prompts({
      initial: 'my-app',
      name: 'projectName',
      message: 'What is your project named?',
      type: 'text',
      async validate(projectName) {
        const validation = await validatePackageName({
          name: projectName,
          path: projectName,
        })
        if (!validation.valid) return validation.message
        return true
      },
    })
    projectName = res.projectName?.trim()
    projectPath = projectName
  }

  // Validate project name
  const nameValidation = await validatePackageName({
    name: projectName,
    path: projectPath,
  })
  if (!nameValidation.valid) throw new ValidationError(nameValidation)

  // Extract template name from CLI or prompt
  const templateName =
    template ??
    (
      await prompts({
        name: 'templateName',
        message: 'What template would you like to use?',
        type: 'select',
        choices: templates.map(({ name, ...t }) => ({ ...t, value: name })),
      })
    ).templateName

  // Validate template name
  templateValidation = await validateTemplateName({
    name: templateName,
    templatesPath,
  })
  if (!templateValidation.valid) throw new ValidationError(templateValidation)

  const targetPath = path.join(process.cwd(), projectPath)
  log(`Creating a new wagmi app in ${pico.green(targetPath)}.`)
  log()

  // Copy template contents into the target path
  const templatePath = path.join(templatesPath, templateName)
  await cpy(path.join(templatePath, '**', '*'), targetPath, {
    rename: (name) => name.replace(/^_dot_/, '.'),
  })

  // Create package.json for project
  const packageJson = await fs.readJSON(path.join(targetPath, 'package.json'))
  packageJson.name = projectName
  await fs.writeFile(
    path.join(targetPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  )

  // Install in background to not clutter screen
  const packageManager = await getPackageManager({ options })
  log(pico.bold(`Using ${packageManager}.`))
  log()
  log('Installing packages. This might take a couple of minutes.')
  const installArgs = [
    'install',
    packageManager === 'npm' ? '--quiet' : '--silent',
  ]
  await oraPromise(
    new Promise((resolve, reject) => {
      const child = execa(packageManager, installArgs, {
        cwd: targetPath,
        env: {
          ...process.env,
          ADBLOCK: '1',
          DISABLE_OPENCOLLECTIVE: '1',
          // we set NODE_ENV to development as pnpm skips dev
          // dependencies when production
          NODE_ENV: 'development',
        },
        stdio: 'inherit',
      })
      child.on('close', (code) => {
        if (code !== 0) {
          reject({ command: `${packageManager} ${installArgs.join(' ')}` })
          return
        }
        resolve(true)
      })
    }),
    {
      failText: 'Failed to install packages.',
      successText: 'Installed packages.',
    },
  )
  log()

  // Create git repository
  if (!options.skipGit) {
    await execa('git', ['init'], { cwd: targetPath })
    await execa('git', ['add', '.'], { cwd: targetPath })
    await execa(
      'git',
      [
        'commit',
        '--no-verify',
        '--message',
        'Initial commit from create-wagmi',
      ],
      { cwd: targetPath },
    )
    log('Initialized a git repository.')
    log()
  }

  log(
    `${pico.green('Success!')} Created ${projectName} at ${path.resolve(
      projectPath,
    )}`,
  )
  log()
  log(
    `To start your app, run \`${pico.bold(
      pico.cyan(`cd ${projectPath}`),
    )}\` and then \`${pico.bold(
      pico.cyan(
        `${packageManager}${packageManager === 'npm' ? ' run' : ''} dev`,
      ),
    )}\``,
  )
  log()
}

;(async () => {
  try {
    await run()
    await notifyUpdate({ options })
  } catch (error) {
    log(
      error instanceof ValidationError
        ? error.message
        : pico.red((<Error>error).message),
    )
    await notifyUpdate({ options })
    process.exit(1)
  }
})()
