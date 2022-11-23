import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { chain, configureChains, createClient } from 'wagmi'

export const walletConnectProjectId = '<WALLET_CONNECT_PROJECT_ID>'

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    ...(process.env.NODE_ENV === 'development' ? [chain.goerli] : []),
  ],
  [walletConnectProvider({ projectId: walletConnectProjectId })],
)

export const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'My wagmi + Web3Modal App', chains }),
  provider,
  webSocketProvider,
})

export { chains }
