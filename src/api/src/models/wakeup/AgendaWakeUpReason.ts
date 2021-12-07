import { formatDate, formatTime } from "../../utils/dateUtils";
import { AgendaEventModel } from "../agenda/AgendaEventModel";
import { AgendaCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";
import { secondsToMinutes } from "../../utils/dateUtils";
import { DirectionModel } from "../direction/DirectionModel";

export class AgendaWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: AgendaCheck,
        currentData: AgendaEventModel,
        private direction: DirectionModel){
            super(config,violatedCheck,currentData)
        }

    public get reasonText():string{
        return `You have an appointment for today at ${formatDate((this.currentData as AgendaEventModel).startDate)} named "${(this.currentData as AgendaEventModel).summary}.\nYou have ${secondsToMinutes(this.config.preparationDuration)} minutes to get ready and leave your house at ${formatTime(this.direction.departureTime)}.\nHere is the summary of your travel : ${this.direction.instructions}"`
    }

    public get homeWorking():boolean{
        return false
    }

    public get category(): WakeUpReasonCategory{
        return WakeUpReasonCategory.AGENDA
    }
}