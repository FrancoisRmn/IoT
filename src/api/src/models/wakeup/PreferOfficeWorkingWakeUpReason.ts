import { WakeUpReason } from "./WakeUpReason";

export class PreferOfficeWorkingWakeUpReason extends WakeUpReason{

    public get reasonText():string{
        return `You prefer to go to the office. You have ${this.config.preparationDuration} to get ready.`
    }
}