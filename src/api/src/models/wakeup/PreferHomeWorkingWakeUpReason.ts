import { WakeUpReason } from "./WakeUpReason";

export class PreferHomeWorkingWakeUpReason extends WakeUpReason{

    public get reasonText():string{
        return `You prefer working from home today. You have ${this.config.preparationDuration} to get ready.`
    }
}