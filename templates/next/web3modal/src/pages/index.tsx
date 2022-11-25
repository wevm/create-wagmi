import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

import { Account } from '../components'

function Page() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Web3Modal + Next.js</h1>

      <Web3Button />

      {isConnected && <Account />}
    </>
  )
}

export default Page
