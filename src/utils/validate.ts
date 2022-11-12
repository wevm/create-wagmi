import fs from 'fs-extra'
import pico from 'picocolors'
import validateProjectName from 'validate-npm-package-name'

import { templates } from '../templates'
import path from 'path'

type ValidationResult =
  | {
      valid: false
      message: string
      problems: string
    }
  | {
      valid: true
      message?: never
      problems?: never
    }

export async function validatePackageName({
  name,
  path: path_,
}: {
  name: string
  path: string
}): Promise<ValidationResult> {
  // Validate project name
  const nameValidation = validateProjectName(name)
  if (!nameValidation.validForNewPackages) {
    const problems = [
      ...(nameValidation.errors ?? []),
      ...(nameValidation.warnings ?? []),
    ]
    return {
      valid: false,
      message: `🙈 "${name}" is not a valid project name.`,
      problems: problems.map((problem) => `👉 ${problem}`).join('\n'),
    }
  }

  // Validate project target path
  const targetPath = path.join(process.cwd(), path_)
  if (await fs.pathExists(targetPath))
    return {
      valid: false,
      message: `🙈 the directory "${path_}" already exists.`,
      problems: '👉 choose another name or delete the directory.',
    }

  return {
    valid: true,
  }
}

export async function validateTemplateName({
  isNameRequired = true,
  name,
  templatesPath,
}: {
  isNameRequired?: boolean
  name: string
  templatesPath: string
}): Promise<ValidationResult> {
  if (isNameRequired && !name)
    return {
      valid: false,
      message: `🙈 no template provided.`,
      problems: '👉 select a template or provide one using --template.',
    }

  if (name && !(await fs.pathExists(path.join(templatesPath, name))))
    return {
      valid: false,
      message: `🙈 the template "${name}" does not exist.`,
      problems: `Choose a valid name. Available: ${templates
        .map(({ name }) => name)
        .join(', ')}`,
    }

  return { valid: true }
}

export class ValidationError extends Error {
  name = 'ValidationError'
  constructor(validation: ValidationResult) {
    super([pico.red(validation.message), validation.problems].join('\n'))
  }
}
