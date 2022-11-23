import fs from 'fs-extra'
import pico from 'picocolors'
import { default as prompts } from 'prompts'

import { createTemplate } from '../../src/utils'
import path from 'path'

const log = console.log

let walletConnectProjectId: string

export default createTemplate({
  name: 'next-with-web3modal',
  title: 'Next.js + Web3Modal',
  description: 'Next.js wagmi project with Web3Modal included',
  hooks: {
    async afterValidate() {
      const errorMessage = 'Project ID is required.'
      walletConnectProjectId = (
        await prompts({
          name: 'walletConnectProjectId',
          message: `What is your WalletConnect Cloud Project ID?\n${pico.blue(
            'Find it at: https://cloud.walletconnect.com/sign-in',
          )}\n`,
          type: 'text',
          validate(projectId) {
            if (!projectId) return errorMessage
            return true
          },
        })
      ).walletConnectProjectId
      if (!walletConnectProjectId) throw new Error(errorMessage)
    },
    async afterInstall({ targetPath }) {
      if (!walletConnectProjectId) return
      const configPath = path.join(targetPath, 'src', 'wagmi.ts')
      const config = fs.readFileSync(configPath).toString()
      fs.writeFileSync(
        configPath,
        config.replace('<WALLET_CONNECT_PROJECT_ID>', walletConnectProjectId),
      )
      log(pico.green('✔'), 'Added WalletConnect Project ID.')
      log()
    },
  },
})
