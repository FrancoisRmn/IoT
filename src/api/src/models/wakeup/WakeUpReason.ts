import { DataSource } from "../DataSource"
import { Check } from "../wake-up-config/WakeUpConfigModel"

export abstract class WakeUpReason{

    constructor(
        private _violatedCheck?: Check,
        private _currentData?: DataSource){}

    public abstract get reasonText():string

    public get violatedCheck(): Check{
        return this._violatedCheck
    }

    public get currentData(): DataSource{
        return this._currentData
    }
}