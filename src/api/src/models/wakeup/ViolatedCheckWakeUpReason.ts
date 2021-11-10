import { DataSource } from "../DataSource";
import { Check, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReason } from "./WakeUpReason";

export abstract class ViolatedCheckWakeUpReason extends WakeUpReason{

    constructor(
        config: WorkingConfig,
        private _violatedCheck: Check,
        private _currentData: DataSource){
            super(config)
        }

    public get violatedCheck(): Check{
        return this._violatedCheck
    }

    public get currentData(): DataSource{
        return this._currentData
    }
}