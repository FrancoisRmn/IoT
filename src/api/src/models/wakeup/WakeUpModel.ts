import { WakeUpReason } from "./WakeUpReason";

export class WakeUpModel {

    constructor(
        private _time: number,
        private _reason: WakeUpReason) {
    }


    public get time(): number {
        return this._time
    }

    public get reason(): WakeUpReason{
        return this._reason
    }

}