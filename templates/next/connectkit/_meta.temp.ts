// TODO: omit .temp from file name when supports wagmi v1
import { compose } from '../../../src/hooks'
import { selectAndInjectProviders } from '../../../src/hooks/common'
import { injectProviders } from '../../../src/hooks/connectkit'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: 'ConnectKit',
  description: 'Next.js wagmi project with ConnectKit included',
  hooks: compose([
    selectAndInjectProviders({
      envNamespace: 'process.env',
      envPrefix: 'NEXT_PUBLIC_',
    }),
    injectProviders({ envNamespace: 'process.env', envPrefix: 'NEXT_PUBLIC_' }),
  ]),
})
