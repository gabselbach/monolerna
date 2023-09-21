import schema from './schema'
export const sharedVariable = 'variableShared'
export const handler = {
  handler: './handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        cors: true,
        private: false,
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}

export const order = {
  handler: './OrderController.getOne',
  events: [
    {
      http: {
        method: 'get',
        path: 'order',
        cors: true,
        private: false,
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
