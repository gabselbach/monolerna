export const iamDefault = {
  role: {
    statements: [
      {
        Effect: 'Allow',
        Resource: '*',
        Action: [
          'ec2:CreateNetworkInterface',
          'ec2:DescribeNetworkInterfaces',
          'ec2:DetachNetworkInterface',
          'ec2:DeleteNetworkInterface',
          'ec2:DescribeSecurityGroups',
          'ec2:DescribeSubnets',
          'ec2:DescribeVpcs',
          'sqs:GetQueueUrl',
          'sqs:SendMessage',
          'sns:Publish',
          'events:DeleteRule',
          'events:PutRule',
          'events:PutTargets',
          'events:RemoveTargets'
        ]
      }
    ]
  }
}
