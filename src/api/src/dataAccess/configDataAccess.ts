import { WakeUpConfig } from "../models/wake-up-config/WakeUpConfigModel";
import * as fs from "fs"
import { SaveConfigException } from "../models/exceptions/SaveConfigException";
import { GetConfigException } from "../models/exceptions/GetConfigException";

class ConfigDataAccess{

    private readonly FILE_NAME = "wakeupconfig.json"
    private readonly FORMAT = "utf8"

    public save(config: WakeUpConfig): WakeUpConfig{
        let data;
        fs.writeFile(this.FILE_NAME, JSON.stringify(config), this.FORMAT, (err)=> {
            if(err) throw new SaveConfigException(err.message)
            data = this.get();
        });
        return data;
    }

    public get(): WakeUpConfig{
        let data;
        fs.readFile(this.FILE_NAME, this.FORMAT, (err, data) => {
            if(err) throw new GetConfigException(err.message)
            data = JSON.parse(data);
        });
        return data;
    }
}

export const configDataAccess = new ConfigDataAccess()