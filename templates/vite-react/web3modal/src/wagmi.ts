import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

export const walletConnectProjectId = '<WALLET_CONNECT_PROJECT_ID>'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
  // @ts-expect-error - TODO: migrate
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const config = createConfig({
  autoConnect: true,
  // @ts-expect-error - TODO: migrate
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 1,
  }),
  publicClient,
  webSocketPublicClient,
})

export { chains }
