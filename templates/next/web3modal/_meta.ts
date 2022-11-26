import { promptAndInjectProjectId } from '../../../src/hooks/web3modal'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: 'Web3Modal',
  description: 'Next.js wagmi project with Web3Modal included',
  hooks: promptAndInjectProjectId(),
})
