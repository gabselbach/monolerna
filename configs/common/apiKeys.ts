export const apiKeys = [
  {
    name: 'monorepo-${self:custom.stage}',
    value: '${ssm:/${self:custom.stage}/monorepo-services/api/key}'
  }
]
