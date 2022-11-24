import { selectAndInjectProviders } from '../../src/hooks'
import { createTemplate } from '../../src/utils'

export default createTemplate({
  name: 'next-with-rainbowkit',
  title: 'Next.js + RainbowKit',
  description: 'Next.js wagmi project with RainbowKit included',
  hooks: selectAndInjectProviders({ envPrefix: 'REACT_APP_' }),
})
