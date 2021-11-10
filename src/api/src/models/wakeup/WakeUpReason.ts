import { WorkingConfig } from "../wake-up-config/WakeUpConfigModel";

export abstract class WakeUpReason{

    constructor(
        private _config: WorkingConfig){}

    public abstract get reasonText():string

    public get config(): WorkingConfig{
        return this._config
    }
}