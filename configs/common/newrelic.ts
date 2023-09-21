export const newRelic = {
  accountId: '${ssm:/${self:custom.stage}/new-relic-id}',
  apiKey: '${ssm:/${self:custom.stage}/new-relic-api-key}',
  layerArn: 'arn:aws:lambda:us-east-1:451483290750:layer:NewRelicNodeJS18X:40',
  cloudWatchFilter: '*',
  enableExtension: true,
  exclude: ['warmUpPlugin']
}
