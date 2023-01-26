import picocolors from 'picocolors'

import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: `@wagmi/cli + Foundry ${picocolors.blue('(Counter.sol Example)')}`,
  description: 'Vite (React) wagmi project with @wagmi/cli + Foundry included',
  hooks: selectAndInjectProviders({
    envNamespace: 'import.meta.env',
    envPrefix: 'VITE_',
  }),
})
