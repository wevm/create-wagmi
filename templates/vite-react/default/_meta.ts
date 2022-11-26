import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  default: true,
  title: 'Default',
  description: 'Vite (React) wagmi project',
  hooks: selectAndInjectProviders({ envPrefix: 'VITE_' }),
})
