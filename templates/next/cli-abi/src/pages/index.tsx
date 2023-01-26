import { useAccount } from 'wagmi'

import { Account, Connect, MintNFT, NetworkSwitcher } from '../components'

function Page() {
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

export default Page
