import picocolors from 'picocolors'

import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: `@wagmi/cli ${picocolors.blue('(Mint NFT Example)')}`,
  description: 'Vite (React) wagmi project with @wagmi/cli set up',
  hooks: selectAndInjectProviders({
    envNamespace: 'import.meta.env',
    envPrefix: 'VITE_',
  }),
})
