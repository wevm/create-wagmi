import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

export const walletConnectProjectId = 'ba7804e457fbb5f1375cbdc14e679617'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, ...(import.meta.env.MODE === 'development' ? [goerli] : [])],
  [walletConnectProvider({ projectId: walletConnectProjectId })],
)

export const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'My wagmi + Web3Modal App', chains }),
  provider,
  webSocketProvider,
})

export { chains }
