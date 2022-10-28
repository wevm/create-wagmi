#!/usr/bin/env node
import { cac } from 'cac'
import cpy from 'cpy'
import { default as spawn } from 'cross-spawn'
import { execa } from 'execa'
import fs from 'fs-extra'
import { oraPromise } from 'ora'
import pico from 'picocolors'
import { default as prompts } from 'prompts'
import checkForUpdate from 'update-check'

import packageJson from '../package.json'
import { templates } from './templates'
import { detectPackageManager, validatePackageName } from './utils'
import path from 'path'
import { fileURLToPath } from 'url'

class CLIError extends Error {}

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

async function getPackageManager() {
  if (options.pnpm) return 'pnpm'
  if (options.yarn) return 'yarn'
  if (options.npm) return 'npm'
  return detectPackageManager()
}

async function run() {
  if (options.help) return

  const __dirname = fileURLToPath(new URL('.', import.meta.url))
  const templatesPath = path.join(__dirname, '..', 'templates')

  // Validate template if provided
  const template = options.template ?? options.t
  if (template && !(await fs.pathExists(path.join(templatesPath, template))))
    throw new CLIError(
      [
        pico.red(`The template "${template}" does not exist.`),
        `Choose a valid name. Available: ${templates
          .map(({ name }) => name)
          .join(', ')}`,
      ].join('\n'),
    )

  // Validate project name
  let projectName, projectPath
  if (args[0]) {
    projectPath = args[0].trim()
    const splitPath = projectPath.split('/')
    projectName = splitPath[splitPath.length - 1]?.trim()
    log(pico.green('✔'), pico.bold(`Using project name:`), projectName)
  } else {
    const res = await prompts({
      initial: 'my-app',
      name: 'projectName',
      message: 'What is your project named?',
      type: 'text',
      validate(name) {
        const validation = validatePackageName(name)
        if (validation.valid) return true
        return 'Invalid project name: ' + validation.problems![0]
      },
    })
    projectName = res.projectName?.trim()
    projectPath = projectName
  }

  if (!validatePackageName(projectName).valid)
    throw new CLIError(
      [
        pico.red(`🙈 "${projectName}" is not a valid project name.`),
        validatePackageName(projectName).problems?.map(
          (problem) => `👉 ${problem}`,
        ),
      ].join('\n'),
    )
  const targetPath = path.join(process.cwd(), projectPath)
  if (await fs.pathExists(targetPath))
    throw new CLIError(
      [
        pico.red(`🙈 the directory "${projectPath}" already exists.`),
        `👉 choose another name or delete the directory.`,
      ].join('\n'),
    )

  // Check template
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
  if (!templateName)
    throw new CLIError(
      [
        pico.red(`🙈 no template provided.`),
        `👉 select a template or provide one using --template.`,
      ].join('\n'),
    )

  log(`Creating a new wagmi app in ${pico.green(targetPath)}.`)
  log()

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
  const packageManager = await getPackageManager()
  log(pico.bold(`Using ${packageManager}.`))
  log()
  log('Installing packages. This might take a couple of minutes.')
  const installArgs = [
    'install',
    packageManager === 'npm' ? '--quiet' : '--silent',
  ]
  await oraPromise(
    new Promise((resolve, reject) => {
      const child = spawn(packageManager, installArgs, {
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

async function notifyUpdate() {
  try {
    const res = await checkForUpdate(packageJson)
    if (res?.latest) {
      const packageManager = await getPackageManager()
      const updateMessage =
        packageManager === 'pnpm'
          ? 'pnpm add -g create-next-app'
          : packageManager === 'yarn'
          ? 'yarn global add create-next-app'
          : 'npm i -g create-next-app'

      log(
        pico.bold(
          pico.yellow('A new version of `create-wagmi` is available!') +
            '\n' +
            'You can update by running: ' +
            pico.cyan(updateMessage) +
            '\n',
        ),
      )
    }
    process.exit()
  } catch {
    // ignore error
  }
}

;(async () => {
  try {
    await run()
    await notifyUpdate()
  } catch (error) {
    log(
      error instanceof CLIError
        ? error.message
        : pico.red((<Error>error).message),
    )
    await notifyUpdate()
    process.exit(1)
  }
})()
