import { IConfig } from './types/config'
import 'dotenv/config'
export const config: IConfig = {
  profile: 'box-dev',
  domain: {
    enabled: true,
    basePath: 'api',
    // eslint-disable-next-line no-template-curly-in-string
    stage: '${self:custom.stageDomain}',
    // eslint-disable-next-line no-template-curly-in-string
    region: '${self.provider.region}',

    securityPolicy: 'tls_1_2',
    createRoute53Record: false,
    certificateName: '*.box-dev.com.br',
    domainName: 'monorepo-api.box-dev.com.br'
  }
}
