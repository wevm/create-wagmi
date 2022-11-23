import { createTemplate, rpcProviderWarning } from '../../src/utils'

export default createTemplate({
  name: 'vite-react',
  title: 'Vite',
  description: 'Vite React wagmi project',
  hooks: {
    async afterSetup() {
      rpcProviderWarning()
    },
  },
})
