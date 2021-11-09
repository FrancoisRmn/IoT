import { AgendaEventModel } from "../agenda/AgendaEventModel";
import { AgendaCheck } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReason } from "./WakeUpReason";

export class AgendaWakeUpReason extends WakeUpReason{

    constructor(
        violatedCheck?: AgendaCheck,
        currentData?: AgendaEventModel){
            super(violatedCheck,currentData)
        }

    public get reasonText():string{
        return `You have an appointment for today at ${(this.currentData as AgendaEventModel).startDate}`
    }
}