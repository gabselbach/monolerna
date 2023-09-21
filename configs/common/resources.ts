export const resources = {
  Resources: {
    ApiGatewayDefaultResponse4XX: {
      Type: 'AWS::ApiGateway::GatewayResponse',
      Properties: {
        ResponseParameters: {
          'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
          'gatewayresponse.header.Access-Control-Allow-Headers':
            "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
          'gatewayresponse.header.Access-Control-Allow-Methods': "'PUT,GET,OPTIONS'"
        },
        ResponseType: 'DEFAULT_4XX',
        RestApiId: {
          Ref: 'ApiGatewayRestApi'
        }
      }
    }
  }
}
