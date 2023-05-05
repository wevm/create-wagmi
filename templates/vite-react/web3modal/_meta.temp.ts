// TODO: omit .temp from file name when supports wagmi v1
import { promptAndInjectProjectId } from '../../../src/hooks/web3modal'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  title: 'Web3Modal',
  description: 'Vite (React) wagmi project with Web3Modal included',
  hooks: promptAndInjectProjectId(),
})
