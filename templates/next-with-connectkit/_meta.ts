import fs from 'fs-extra'

import { compose, selectAndInjectProviders } from '../../src/hooks'
import { providers } from '../../src/meta'
import { createTemplate } from '../../src/utils'
import path from 'path'

export default createTemplate({
  name: 'next-with-connectkit',
  title: 'Next.js + ConnectKit',
  description: 'Next.js wagmi project with ConnectKit included',
  hooks: compose([
    selectAndInjectProviders({ envPrefix: 'NEXT_PUBLIC_' }),
    {
      async beforeInstall({ context, targetPath }) {
        const { providerNames } = context.get()

        const configPath = path.join(targetPath, 'src', 'wagmi.ts')

        let src = fs.readFileSync(configPath).toString()
        src = src.replace(
          /([\s\S]*getDefaultClient[\s\S]*)(\s\s}\),)([\s\S]*)/,
          (_, a, _b, c) => {
            return (
              a +
              providerNames
                .map((providerName) => {
                  const provider = providers[providerName]
                  if (!provider.apiKey) return ''
                  return `    ${provider.name}Id: process.env.NEXT_PUBLIC_${provider.apiKey.env}!,\n`
                })
                .join('') +
              '  })' +
              c
            )
          },
        )

        fs.writeFileSync(configPath, src)
      },
    },
  ]),
})
