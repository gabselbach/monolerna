import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import { sharedVariable } from '@monorepo/order'

const users: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  console.log('event', JSON.stringify(event, null, 2))

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world! This is variable shared between packages  ${sharedVariable }`,
    event
  })
}

export const main = middyfy(users)
