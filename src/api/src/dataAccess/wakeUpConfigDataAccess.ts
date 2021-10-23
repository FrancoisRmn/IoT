import { WakeUpConfigModel } from "src/models/wake-up-config/WakeUpConfigModel";

class WakeUpConfigDataAccess{

    public getConfig(): WakeUpConfigModel{

    }
}

export const wakeUpConfigDataAccess = new WakeUpConfigDataAccess()