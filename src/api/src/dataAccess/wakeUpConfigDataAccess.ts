import { WakeUpConfig } from "../models/wake-up-config/WakeUpConfigModel";
import * as config from '../WakeUpConfig.json';

class WakeUpConfigDataAccess{

    public async getConfig(): Promise<WakeUpConfig>{
        return config as WakeUpConfig
    }
}

export const wakeUpConfigDataAccess = new WakeUpConfigDataAccess()
