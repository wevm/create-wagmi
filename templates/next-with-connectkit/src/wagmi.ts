import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  }),
)
