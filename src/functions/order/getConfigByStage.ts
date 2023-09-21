import { config as configDev } from 'configs/dev'
import { IConfig } from 'configs/types/config'

export const getConfigByStage = async (stage: string): Promise<{ config: IConfig; }> => {
  switch (stage) {
    case 'dev':
      return { config: configDev }
    default:
      throw new Error('env STAGE Invalid or not informed.')
  }
}
