import picocolors from 'picocolors'

import { compose } from '../../../src/hooks'
import {
  PromptAndInjectEtherscanContext,
  SelectAndInjectProvidersContext,
  promptAndInjectEtherscan,
  selectAndInjectProviders,
} from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: `@wagmi/cli + Etherscan ${picocolors.blue('(Mint NFT Example)')}`,
  description:
    'Vite (React) wagmi project with @wagmi/cli Etherscan Plugin set up',
  hooks: compose<
    SelectAndInjectProvidersContext & PromptAndInjectEtherscanContext
  >([
    selectAndInjectProviders({
      envNamespace: 'import.meta.env',
      envPrefix: 'VITE_',
    }),
    promptAndInjectEtherscan(),
  ]),
})
