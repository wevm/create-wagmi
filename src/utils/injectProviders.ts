import fs from 'fs-extra'

import { providers } from '../meta'
import { ProviderApiKeyEnvVars, ProviderName } from '../types'
import path from 'path'

export function injectProviders({
  envPrefix,
  envVars,
  targetPath,
  providerNames,
}: {
  envPrefix: string
  envVars: Record<ProviderApiKeyEnvVars, string>
  targetPath: string
  providerNames: ProviderName[]
}) {
  if (Object.values(envVars).length > 0) {
    fs.writeFileSync(path.join(targetPath, '.env'), '')
    fs.writeFileSync(path.join(targetPath, '.env.example'), '')
    Object.entries(envVars).forEach(([key, value]) => {
      fs.appendFileSync(
        path.join(targetPath, '.env'),
        `${envPrefix}${key}=${value}\n`,
      )
      fs.appendFileSync(
        path.join(targetPath, '.env.example'),
        `${envPrefix}${key}=\n`,
      )
    })
  }

  const configPath = path.join(targetPath, 'src', 'wagmi.ts')
  let src = fs.readFileSync(configPath).toString()

  // Add provider imports
  src = src.replace(
    /import { publicProvider } from 'wagmi\/providers\/public'/,
    providerNames
      .map(
        (providerName) =>
          `import { ${providerName}Provider } from 'wagmi/providers/${providerName}'`,
      )
      .join('\n'),
  )

  // Add providers to configureChains
  src = src.replace(
    /publicProvider\(\)/,
    providerNames
      .map((providerName) => {
        const provider = providers[providerName]
        return `\n    ${provider.name}Provider(${
          provider.apiKey
            ? `{ apiKey: process.env.${envPrefix}${provider.apiKey.env}! }`
            : ''
        }),`
      })
      .join('') + '\n  ',
  )

  fs.writeFileSync(configPath, src)
}
