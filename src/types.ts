export type Context<TCtx> = {
  get: () => TCtx
  set: (val: TCtx) => void
}

export type Hooks<TCtx> = {
  afterValidate?(opts: { context: Context<TCtx> }): Promise<void>
  beforeInstall?(opts: {
    context: Context<TCtx>
    targetPath: string
  }): Promise<void>
  afterInstall?(opts: {
    context: Context<TCtx>
    targetPath: string
  }): Promise<void>
  afterSetup?(opts: {
    context: Context<TCtx>
    targetPath: string
  }): Promise<void>
}

export type ProviderName = 'alchemy' | 'infura' | 'public'
export type ProviderApiKeyEnvVars = 'ALCHEMY_API_KEY' | 'INFURA_API_KEY'
export type Provider = {
  name: ProviderName
  title: string
  description: string
  apiKey: {
    env: ProviderApiKeyEnvVars
    url: string
  } | null
}

export type Template<TCtx = any> = {
  name: string
  title: string
  description: string
  hooks?: Hooks<TCtx>
}
