import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  default: true,
  title: 'RainbowKit',
  description: 'Vite (React) wagmi project with RainbowKit included',
  hooks: selectAndInjectProviders({ envPrefix: 'VITE_' }),
})
