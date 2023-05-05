import fs from 'fs-extra'
import pico from 'picocolors'
import { default as prompts } from 'prompts'

import { Hooks } from '../../types'
import path from 'path'

const log = console.log

export type PromptAndInjectProjectIdContext = {
  walletConnectProjectId: string
}

export const promptAndInjectProjectId =
  (): Hooks<PromptAndInjectProjectIdContext> => ({
    async afterValidate({ context }) {
      const walletConnectProjectId = (
        await prompts({
          name: 'walletConnectProjectId',
          message: `Optional: What is your WalletConnect Cloud Project ID?\n${pico.blue(
            'Find it at: https://cloud.walletconnect.com/sign-in',
          )}\n${pico.cyan('⏎ to skip')}\n`,
          type: 'text',
        })
      ).walletConnectProjectId
      context.set({ walletConnectProjectId })
    },
    async beforeInstall({ context, targetPath }) {
      const { walletConnectProjectId } = context.get()
      const configPath = path.join(targetPath, 'src', 'wagmi.ts')
      const config = fs.readFileSync(configPath).toString()
      if (!walletConnectProjectId) {
        fs.writeFileSync(
          configPath,
          config
            .replace(
              "\nconst walletConnectProjectId = '<WALLET_CONNECT_PROJECT_ID>'\n",
              '',
            )
            .replace(
              /(new WalletConnectConnector(.|\n)*}\),)\n\s\s\s\s*(.*new)/,
              '$3',
            ),
        )
        return
      }
      fs.writeFileSync(
        configPath,
        config.replace('<WALLET_CONNECT_PROJECT_ID>', walletConnectProjectId),
      )
      log(pico.green('✔'), 'Added WalletConnect Project ID.')
      log()
    },
  })
