import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

import { Account } from './components'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Web3Modal + Vite</h1>

      <Web3Button />

      {isConnected && <Account />}
    </>
  )
}
