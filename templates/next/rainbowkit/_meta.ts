import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: 'RainbowKit',
  description: 'Next.js wagmi project with RainbowKit included',
  hooks: selectAndInjectProviders({ envPrefix: 'REACT_APP_' }),
})
