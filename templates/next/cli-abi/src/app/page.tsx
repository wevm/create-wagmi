import { Account } from '../components/Account'
import { Connect } from '../components/Connect'
import { Connected } from '../components/Connected'
import { MintNFT } from '../components/MintNFT'
import { NetworkSwitcher } from '../components/NetworkSwitcher'

export function Page() {
  return (
    <>
      <h1>wagmi + Next.js + @wagmi/cli (ABI)</h1>

      <Connect />

      <Connected>
        <Account />
        <hr />
        <MintNFT />
        <hr />
        <NetworkSwitcher />
      </Connected>
    </>
  )
}

export default Page
