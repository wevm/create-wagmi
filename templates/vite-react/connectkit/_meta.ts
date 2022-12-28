import { compose } from '../../../src/hooks'
import { selectAndInjectProviders } from '../../../src/hooks/common'
import { injectProviders } from '../../../src/hooks/connectkit'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: 'ConnectKit',
  description: 'Vite (React) wagmi project with ConnectKit included',
  hooks: compose([
    selectAndInjectProviders({
      envNamespace: 'import.meta.env',
      envPrefix: 'VITE_',
    }),
    injectProviders({
      envNamespace: 'import.meta.env',
      envPrefix: 'VITE_',
    }),
  ]),
})
