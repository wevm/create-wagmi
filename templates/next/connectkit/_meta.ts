import { compose } from '../../../src/hooks'
import {
  promptAndInjectProjectId,
  selectAndInjectProviders,
} from '../../../src/hooks/common'
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
    promptAndInjectProjectId({ required: true }),
  ]),
})
