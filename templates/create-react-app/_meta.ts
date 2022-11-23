import { createTemplate, rpcProviderWarning } from '../../src/utils'

export default createTemplate({
  name: 'create-react-app',
  title: 'Create React App',
  description: 'Create React App wagmi project',
  hooks: {
    async afterSetup() {
      rpcProviderWarning()
    },
  },
})
