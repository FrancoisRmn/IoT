import { WakeUpConfig } from "../models/wake-up-config/WakeUpConfigModel";
import * as fs from "fs"
import { SaveConfigException } from "../models/exceptions/SaveConfigException";
import { GetConfigException } from "../models/exceptions/GetConfigException";
import {promisify} from "util"
import { SystemException } from "../models/exceptions/SystemException";
import * as path from "path"

class ConfigDataAccess{

    private readonly FILE_NAME = "../wakeupconfig.json"
    private readonly FORMAT = "utf8"

    public async save(config: WakeUpConfig): Promise<WakeUpConfig>{
        const writeFile = promisify(fs.writeFile);
        try{
            await writeFile(this.FILE_NAME, JSON.stringify(config), this.FORMAT)
            return this.get()
        }catch(err){
            throw new SystemException(err)
        }
    }

    public async get(): Promise<WakeUpConfig>{
        const readFile = promisify(fs.readFile);
        try{
            const data = await readFile(this.FILE_NAME, this.FORMAT)
            return JSON.parse(data);
        } catch(err){
            throw new SystemException(err)
        }
    }
}

export const configDataAccess = new ConfigDataAccess()