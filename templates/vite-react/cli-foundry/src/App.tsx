import { useAccount } from 'wagmi'

import { Account } from './components/Account'
import { Connect } from './components/Connect'
import { Counter } from './components/Counter'
import { NetworkSwitcher } from './components/NetworkSwitcher'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Vite</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <hr />
          <Counter />
          <hr />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
