import { DirectionModel } from "../direction/DirectionModel";
import { DirectionCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";

export class NoPublicTransportAvailableWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: DirectionCheck,
        currentData: DirectionModel){
            super(config,violatedCheck,currentData)
        }

    public get reasonText(): string{
        return `Traffic does not allow you to go to the office because no public transport is available`
    }

    public get homeWorking():boolean{
        return true
    }

    public get category(): WakeUpReasonCategory{
        return WakeUpReasonCategory.TRAFFIC
    }
}