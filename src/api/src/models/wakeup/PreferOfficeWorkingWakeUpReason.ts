import { formatTime, secondsToMinutes } from "../../utils/dateUtils";
import { DirectionModel } from "../direction/DirectionModel";
import { WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReason } from "./WakeUpReason";

export class PreferOfficeWorkingWakeUpReason extends WakeUpReason{

    constructor(
        config: WorkingConfig,
        private direction: DirectionModel){
            super(config)
        }

    public get reasonText():string{
        return `You prefer to going to the office. You have ${secondsToMinutes(this.config.preparationDuration)} minutes to get ready and leave your house at ${formatTime(this.direction.departureTime)}`
    }

    public get homeWorking():boolean{
        return false
    }
}