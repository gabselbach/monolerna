import schema from './schema'
export const handler = {
  handler: './handler.main',
  name: 'users',
  events: [
    {
      http: {
        method: 'post',
        path: 'users',
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
