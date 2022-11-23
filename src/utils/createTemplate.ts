export type Template = {
  name: string
  title: string
  description: string
  hooks?: {
    afterValidate?(): Promise<void>
    afterInstall?(opts: { targetPath: string }): Promise<void>
    afterSetup?(opts: { targetPath: string }): Promise<void>
  }
}

export function createTemplate(template: Template): Template {
  return template
}
