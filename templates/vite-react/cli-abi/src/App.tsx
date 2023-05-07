import { useAccount } from 'wagmi'

import { Account } from './components/Account'
import { Connect } from './components/Connect'
import { MintNFT } from './components/MintNFT'
import { NetworkSwitcher } from './components/NetworkSwitcher'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Next.js + @wagmi/cli (Etherscan)</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <hr />
          <MintNFT />
          <hr />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
