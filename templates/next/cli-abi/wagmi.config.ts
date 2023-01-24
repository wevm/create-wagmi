import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

import { wagmiMintExampleAbi } from './abis/wagmiMintExampleAbi'

export default defineConfig(() => {
  return {
    out: 'src/generated.ts',
    contracts: [
      {
        abi: wagmiMintExampleAbi,
        name: 'WagmiMintExample',
        address: {
          [chains.mainnet.id]: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
          [chains.goerli.id]: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
        },
      },
    ],
    plugins: [react()],
  }
})
