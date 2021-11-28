import { formatTime, secondsToMinutes } from "../../utils/dateUtils";
import { DirectionModel } from "../direction/DirectionModel";
import { WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReason } from "./WakeUpReason";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";

export class PreferOfficeWorkingWakeUpReason extends WakeUpReason{

    constructor(
        config: WorkingConfig,
        private direction: DirectionModel){
            super(config)
        }

    public get reasonText():string{
        return `You prefer to going to the office.\nYou have ${secondsToMinutes(this.config.preparationDuration)} minutes to get ready and leave your house at ${formatTime(this.direction.departureTime)}.\nHere is the summary of your travel : ${this.direction.summary}`
    }

    public get homeWorking():boolean{
        return false
    }

    public get category(): WakeUpReasonCategory{
        return WakeUpReasonCategory.USUAL
    }
}