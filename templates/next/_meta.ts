import { createTemplate, rpcProviderWarning } from '../../src/utils'

export default createTemplate({
  name: 'next',
  title: 'Next.js',
  description: 'Next.js wagmi project',
  hooks: {
    async afterSetup() {
      rpcProviderWarning()
    },
  },
})
