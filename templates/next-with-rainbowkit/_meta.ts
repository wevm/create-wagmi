import { createTemplate, rpcProviderWarning } from '../../src/utils'

export default createTemplate({
  name: 'next-with-rainbowkit',
  title: 'Next.js + RainbowKit',
  description: 'Next.js wagmi project with RainbowKit included',
  hooks: {
    async afterSetup() {
      rpcProviderWarning()
    },
  },
})
