import { compose } from '../../../src/hooks'
import {
  PromptAndInjectEtherscanContext,
  SelectAndInjectProvidersContext,
  promptAndInjectEtherscan,
  selectAndInjectProviders,
} from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: '@wagmi/cli + Etherscan (Mint NFT)',
  description: 'Next.js wagmi project with @wagmi/cli Etherscan Plugin set up',
  hooks: compose<
    SelectAndInjectProvidersContext & PromptAndInjectEtherscanContext
  >([
    selectAndInjectProviders({
      envNamespace: 'process.env',
      envPrefix: 'NEXT_PUBLIC_',
    }),
    promptAndInjectEtherscan(),
  ]),
})
