import { createTemplate, rpcProviderWarning } from '../../src/utils'

export default createTemplate({
  name: 'next-with-connectkit',
  title: 'Next.js + ConnectKit',
  description: 'Next.js wagmi project with ConnectKit included',
  hooks: {
    async afterSetup() {
      rpcProviderWarning({
        readMoreUrl:
          'https://docs.family.co/connectkit/getting-started#getting-started-2-implementation',
      })
    },
  },
})
