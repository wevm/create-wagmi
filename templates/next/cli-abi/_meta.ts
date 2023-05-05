import picocolors from 'picocolors'

import { compose } from '../../../src/hooks'
import {
  promptAndInjectProjectId,
  selectAndInjectProviders,
} from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: `@wagmi/cli ${picocolors.blue('(Mint NFT Example)')}`,
  description: 'Next.js wagmi project with @wagmi/cli set up',
  hooks: compose([
    selectAndInjectProviders({
      envNamespace: 'process.env',
      envPrefix: 'NEXT_PUBLIC_',
    }),
    promptAndInjectProjectId(),
  ]),
})
