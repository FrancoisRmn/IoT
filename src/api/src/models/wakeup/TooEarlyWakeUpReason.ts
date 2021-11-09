import { DirectionModel } from "../direction/DirectionModel";
import { DirectionCheck } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReason } from "./WakeUpReason";

export class TooEarlyWakeUpReason extends WakeUpReason{

    constructor(
        violatedCheck?: DirectionCheck,
        currentData?: DirectionModel){
            super(violatedCheck,currentData)
        }

    public get reasonText(): string{
        return `Traffic does not allow you to go to the office because you would have to leave at ${(this.currentData as DirectionModel).departureTime} (you asked not to be woken up before ${(this.violatedCheck as DirectionCheck).noWakeUpBefore})`
    }
}