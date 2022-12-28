import { selectAndInjectProviders } from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  default: true,
  title: 'Default',
  description: 'Next.js wagmi project',
  hooks: selectAndInjectProviders({
    envNamespace: 'process.env',
    envPrefix: 'NEXT_PUBLIC_',
  }),
})
