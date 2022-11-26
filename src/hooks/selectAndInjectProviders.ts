import { Hooks } from '../types'
import { injectProviders, rpcProviderWarning, selectProviders } from '../utils'

type SelectProvidersReturnValue = Awaited<ReturnType<typeof selectProviders>>

type Context = {
  envVars: SelectProvidersReturnValue['envVars']
  providerNames: SelectProvidersReturnValue['providerNames']
}

export function selectAndInjectProviders({
  envPrefix,
}: {
  envPrefix: string
}): Hooks<Context> {
  return {
    async afterValidate({ context }) {
      const { envVars, providerNames } = await selectProviders()
      context.set({ envVars, providerNames })
    },
    async beforeInstall({ context, targetPath }) {
      const { envVars, providerNames } = context.get()
      injectProviders({ envPrefix, envVars, providerNames, targetPath })
    },
    async afterSetup({ context }) {
      const { providerNames } = context.get()
      if (providerNames.length === 1 && providerNames[0] === 'public') {
        rpcProviderWarning()
      }
    },
  }
}
