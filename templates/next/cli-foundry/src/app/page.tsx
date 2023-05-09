import { Account } from '../components/Account'
import { Connect } from '../components/Connect'
import { Connected } from '../components/Connected'
import { Counter } from '../components/Counter'
import { NetworkSwitcher } from '../components/NetworkSwitcher'

export function Page() {
  return (
    <>
      <h1>wagmi + Next.js + Foundry</h1>

      <Connect />

      <Connected>
        <Account />
        <hr />
        <Counter />
        <hr />
        <NetworkSwitcher />
      </Connected>
    </>
  )
}

export default Page
