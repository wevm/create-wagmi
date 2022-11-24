import { selectAndInjectProviders } from '../../src/hooks'
import { createTemplate } from '../../src/utils'

export default createTemplate({
  name: 'next',
  title: 'Next.js',
  description: 'Next.js wagmi project',
  hooks: selectAndInjectProviders({ envPrefix: 'NEXT_PUBLIC_' }),
})
