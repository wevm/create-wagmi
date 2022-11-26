import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  default: true,
  title: 'Default',
  description: 'Next.js wagmi project',
  hooks: selectAndInjectProviders({ envPrefix: 'NEXT_PUBLIC_' }),
})
