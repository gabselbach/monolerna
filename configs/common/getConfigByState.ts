import { config as configDev } from '../dev'
import { config as configStg } from '../staging'
import { config as configProd } from '../prod'
import { IConfig } from '../types/config'

export const getConfigByStage = async (stage: string): Promise<{ config: IConfig; }> => {
  switch (stage) {
    case 'dev':
      return await { config: configDev }
    case 'staging':
      return await { config: configStg }
    case 'prod':
      return await { config: configProd }
    default:
      throw new Error('env STAGE Invalid or not informed.')
  }
}
