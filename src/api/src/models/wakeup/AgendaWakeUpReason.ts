import { AgendaEventModel } from "../agenda/AgendaEventModel";
import { AgendaCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";

export class AgendaWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: AgendaCheck,
        currentData: AgendaEventModel){
            super(config,violatedCheck,currentData)
        }

    public get reasonText():string{
        return `You have an appointment for today at ${(this.currentData as AgendaEventModel).startDate}`
    }
}