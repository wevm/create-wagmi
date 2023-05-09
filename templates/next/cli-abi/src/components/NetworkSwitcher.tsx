'use client'

import { BaseError } from 'viem'
import { useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <>
      <div>
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
      </div>

      {switchNetwork && (
        <div>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </button>
            ),
          )}
        </div>
      )}

      {error && <div>{(error as BaseError).message}</div>}
    </>
  )
}
