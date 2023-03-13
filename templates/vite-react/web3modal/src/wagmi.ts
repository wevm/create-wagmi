import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

export const walletConnectProjectId = '<WALLET_CONNECT_PROJECT_ID>'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const client = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 1,
  }),
  provider,
  webSocketProvider,
})

export { chains }
