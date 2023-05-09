import { getDefaultClient } from 'connectkit'
import { createConfig } from 'wagmi'

export const config = createConfig(
  // @ts-expect-error - TODO: migrate
  getDefaultClient({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
  }),
)
