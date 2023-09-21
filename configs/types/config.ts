export interface IConfig {
  profile?: string
  domain?: {
    enabled: boolean
    basePath: string
    stage: string
    region: string

    securityPolicy: string
    createRoute53Record: boolean
    certificateName: string
    domainName: string
  }
  customDomain?: {
    enabled: boolean
    basePath: string
    stage: string
    securityPolicy: string
    createRoute53Record: boolean
    certificateName: string
    domainName: string
  }
}
