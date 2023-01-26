import { useAccount } from 'wagmi'

import { Account, Connect, ERC20, NetworkSwitcher } from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + ERC20 + Next.js</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
          <ERC20 />
        </>
      )}
    </>
  )
}

export default Page
