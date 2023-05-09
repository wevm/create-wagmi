'use client'

import type { ReactNode } from 'react'
import { useAccount } from 'wagmi'

export function Connected({ children }: { children: ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) return null
  return <>{children}</>
}
