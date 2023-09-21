export const vpc = {
  securityGroupIds: ['${ssm:/${self:custom.stage}/vpc/security-group/default}'],
  subnetIds: [
    '${ssm:/${self:custom.stage}/vpc/subnets/private/a}',
    '${ssm:/${self:custom.stage}/vpc/subnets/private/b}'
  ]
}
