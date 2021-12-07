import { WakeUpReason } from "./WakeUpReason";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";
import { secondsToMinutes } from "../../utils/dateUtils";

export class PreferHomeWorkingWakeUpReason extends WakeUpReason{

    public get reasonText():string{
        return `You prefer working from home today. You have ${secondsToMinutes(this.config.preparationDuration)} minutes to get ready.`
    }

    public get homeWorking():boolean{
        return true
    }

    public get category(): WakeUpReasonCategory{
        return WakeUpReasonCategory.USUAL
    }
}