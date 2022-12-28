import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: 'RainbowKit',
  description: 'Vite (React) wagmi project with RainbowKit included',
  hooks: selectAndInjectProviders({
    envNamespace: 'import.meta.env',
    envPrefix: 'VITE_',
  }),
})
