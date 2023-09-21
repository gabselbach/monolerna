import type { AWS } from '@serverless/typescript'
import { tags } from 'configs/common/tags'
import { IConfig } from 'configs/types/config'
import 'dotenv/config'
import { vpc } from 'configs/common/vpc'
import { iamDefault } from 'configs/common/iam'
import { apiGateway } from 'configs/common/apiGateway'
import { environment } from 'configs/common/environment'
import { newRelic } from 'configs/common/newrelic'
import { apiKeys } from 'configs/common/apiKeys'
import { resources } from 'configs/common/resources'
import { config as configDev } from 'configs/dev'
import { config as configStg } from 'configs/staging'
import { config as configProd } from 'configs/prod'
import { handler } from './index'

const getConfigByStage = async (stage: string): Promise<{ config: IConfig }> => {
  switch (stage) {
    case 'dev':
      return { config: await configDev }
    case 'staging':
      return { config: await configStg }
    case 'prod':
      return { config: await configProd }
    default:
      throw new Error('env STAGE Invalid or not informed.')
  }
}

const getServerlessConfig = async (functions?: any): Promise<AWS> => {
  const { config } = await getConfigByStage(process.env.SLS_STAGE)
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
        httpPort: 3005,
        lambdaPort: 3006,
        websocketPort: 3007
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
    functions,
    resources
  }
}
module.exports = getServerlessConfig({handler})
