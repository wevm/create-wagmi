import picocolors from 'picocolors'

import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: `@wagmi/cli + Foundry ${picocolors.blue('(Counter.sol Example)')}`,
  description: 'Next.js wagmi project with @wagmi/cli + Foundry included',
  hooks: selectAndInjectProviders({
    envNamespace: 'process.env',
    envPrefix: 'NEXT_PUBLIC_',
  }),
})
