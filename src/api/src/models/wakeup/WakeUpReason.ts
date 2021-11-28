import { WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";

export abstract class WakeUpReason{

    constructor(
        private _config: WorkingConfig){}

    public abstract get reasonText():string
    public abstract get homeWorking():boolean
    public abstract get category(): WakeUpReasonCategory

    public get config(): WorkingConfig{
        return this._config
    }
}