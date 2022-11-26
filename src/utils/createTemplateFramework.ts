import { TemplateFramework } from '../types'

type CreateTemplateFramework = Omit<TemplateFramework, 'id' | 'name'>

export function createTemplateFramework(
  templateFramework: CreateTemplateFramework,
): CreateTemplateFramework {
  return templateFramework
}
