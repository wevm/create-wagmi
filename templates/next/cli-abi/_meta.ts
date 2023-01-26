import picocolors from 'picocolors'

import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: `@wagmi/cli ${picocolors.blue('(Mint NFT Example)')}`,
  description: 'Next.js wagmi project with @wagmi/cli set up',
  hooks: selectAndInjectProviders({
    envNamespace: 'process.env',
    envPrefix: 'NEXT_PUBLIC_',
  }),
})
