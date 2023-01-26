import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: '@wagmi/cli + ERC20',
  description: 'Next.js wagmi project with @wagmi/cli ERC Plugin set up',
  hooks: selectAndInjectProviders({
    envNamespace: 'process.env',
    envPrefix: 'NEXT_PUBLIC_',
  }),
})
