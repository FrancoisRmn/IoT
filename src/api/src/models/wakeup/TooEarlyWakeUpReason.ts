import { DirectionModel } from "../direction/DirectionModel";
import { DirectionCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";

export class TooEarlyWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: DirectionCheck,
        currentData: DirectionModel){
            super(config,violatedCheck,currentData)
        }

    public get reasonText(): string{
        return `Traffic does not allow you to go to the office because you would have to leave at ${(this.currentData as DirectionModel).departureTime} (you asked not to be woken up before ${(this.violatedCheck as DirectionCheck).noWakeUpBefore})`
    }
}