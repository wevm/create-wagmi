import { selectAndInjectProviders } from '../../src/hooks'
import { createTemplate } from '../../src/utils'

export default createTemplate({
  name: 'create-react-app',
  title: 'Create React App',
  description: 'Create React App wagmi project',
  hooks: selectAndInjectProviders({ envPrefix: 'REACT_APP_' }),
})
