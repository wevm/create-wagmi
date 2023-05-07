'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'

import {
  usePrepareWagmiMintExampleMint,
  useWagmiMintExampleMint,
} from '../generated'

export function MintNFT() {
  const [tokenId, setTokenId] = useState('')

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareWagmiMintExampleMint({
    args: tokenId ? [BigInt(tokenId)] : undefined,
  })
  const { data, error, isError, write } = useWagmiMintExampleMint(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div>
      <input
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Token ID (optional)"
        value={tokenId}
      />
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
}
