import { selectAndInjectProviders } from '../../src/hooks'
import { createTemplate } from '../../src/utils'

export default createTemplate({
  name: 'vite-react',
  title: 'Vite',
  description: 'Vite React wagmi project',
  hooks: selectAndInjectProviders({ envPrefix: 'VITE_' }),
})
