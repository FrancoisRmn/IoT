import { formatDate, formatTime } from "../../utils/dateUtils";
import { AgendaEventModel } from "../agenda/AgendaEventModel";
import { AgendaCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";
import { ViolationType } from "./ViolationType";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";

export class AgendaWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: AgendaCheck,
        currentData: AgendaEventModel){
            super(config,violatedCheck,currentData)
        }

    public get reasonText():string{
        return `You have an appointment for today at ${formatDate((this.currentData as AgendaEventModel).startDate)} named "${(this.currentData as AgendaEventModel).summary}"`
    }

    public get homeWorking():boolean{
        return false
    }

    public get category(): WakeUpReasonCategory{
        return WakeUpReasonCategory.AGENDA
    }
}