import moment from "moment";
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
        return `You have an appointment for today at ${moment((this.currentData as AgendaEventModel).startDate).format("h:mm:ss a")} named "${(this.currentData as AgendaEventModel).summary}"`
    }
}