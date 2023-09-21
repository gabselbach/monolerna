import { AwsLambdaEnvironment } from '@serverless/typescript'

export const environment: AwsLambdaEnvironment = {
  STAGE: '${self:custom.stage}',
  MONGO_URI: '${ssm:/${self:custom.stage}/monorepo-services/db/mongo/uri}/core?retryWrites=true'
}
