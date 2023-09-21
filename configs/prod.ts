import { IConfig } from './types/config'

export const config: IConfig = {
  customDomain: {
    enabled: true,
    basePath: 'api',
    // eslint-disable-next-line no-template-curly-in-string
    stage: '${self:custom.stage}',
    domainName: 'monorepo-api.box.com.br',
    certificateName: '*.box.com.br',
    createRoute53Record: false,
    securityPolicy: 'tls_1_2'
  }
}
