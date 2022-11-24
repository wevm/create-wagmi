import templateImports from '../generated/templateImports'
import { templates as templateNames } from '../meta'
import { Template } from '../types'

export const getTemplatesMeta = async () => {
  let templates = await Promise.all(
    templateImports.map(
      async (templateImport) => (await templateImport()).default,
    ),
  )

  let orderedTemplates: Template[] = []
  templateNames.forEach((templateName) => {
    const template = templates.find(
      (template) => template.name === templateName,
    )
    if (!template) return

    orderedTemplates = [...orderedTemplates, template]
    templates = templates.filter((template) => template.name !== templateName)
  })
  return [...orderedTemplates, ...templates]
}
