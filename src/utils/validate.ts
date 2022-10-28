import validateProjectName from 'validate-npm-package-name'

export function validatePackageName(projectName: string) {
  const nameValidation = validateProjectName(projectName)
  if (nameValidation.validForNewPackages) return { valid: true }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors ?? []),
      ...(nameValidation.warnings ?? []),
    ],
  }
}
