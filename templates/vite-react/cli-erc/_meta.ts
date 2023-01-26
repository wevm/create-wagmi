import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: '@wagmi/cli + ERC20',
  description: 'Vite (React) wagmi project with @wagmi/cli ERC Plugin set up',
  hooks: selectAndInjectProviders({
    envNamespace: 'import.meta.env',
    envPrefix: 'VITE_',
  }),
})
