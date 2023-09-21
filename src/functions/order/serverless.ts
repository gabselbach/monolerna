
import type { AWS } from '@serverless/typescript'
import { tags } from '../../../configs/common/tags'
import 'dotenv/config'
import { vpc } from '../../../configs/common/vpc'
import { iamDefault } from '../../../configs/common/iam'
import { apiGateway } from '../../../configs/common/apiGateway'
import { environment } from '../../../configs/common/environment'
import { newRelic } from '../../../configs/common/newrelic'
import { apiKeys } from '../../../configs/common/apiKeys'
import { resources } from '../../../configs/common/resources'
import { handler, order } from './index'
import { getConfigByStage } from './getConfigByStage'

const getServerlessConfig = async (): Promise<AWS> => {
  const { config } = await getConfigByStage('dev')
  return {
    service: 'nexthub-services',
    frameworkVersion: '3',

    provider: {
      name: 'aws',
      region: 'us-east-1',
      profile: config.profile,
      stage: '${self:custom.stageDomain}',

      runtime: 'nodejs18.x',
      timeout: 30,
      memorySize: 128,
      versionFunctions: false,

      tags,
      vpc,
      iam: iamDefault,
      stackTags: tags,
      apiGateway,
      environment,
      deploymentBucket: {
        name: 'mobly.${self:custom.stage}.serverless.${self:provider.region}.deploys'
      }
    },
    package: { individually: true },
    custom: {
      stage: '${env:SLS_STAGE, opt:stage, self:provider.stage}',
      stageDomain: 'cia',
      esbuild: {
        bundle: true,
        minify: false,
        sourcemap: true,
        exclude: ['aws-sdk'],
        target: 'node18',
        define: { 'require.resolve': undefined },
        platform: 'node',
        concurrency: 10
      },
      'serverless-offline': {
        prefix: 'api',
        host: '0.0.0.0',
        useChildProcesses: true,
        noPrependStageInUrl: true,
        httpPort: 3000,
        lambdaPort: 3001,
        websocketPort: 3002
      },
      'serverless-layers': {
        packageManager: 'yarn',
        dependenciesPath: './package.json',
        compatibleRuntimes: ['nodejs18.x']
      },
      newRelic,
      apiKeys,
      customDomain: config.domain
    },
    plugins: [
      'serverless-esbuild',
      'serverless-offline',
      'serverless-layers',
      'serverless-add-api-key',
      'serverless-domain-manager',
      'serverless-iam-roles-per-function',
      'serverless-newrelic-lambda-layers'
    ],
    functions: { handler, order },
    resources
  }
}
module.exports = getServerlessConfig()
