import { WakeUpReasonCategory } from "../wakeup/WakeUpReasonCategory";

export interface WakeUpDAO{
    time: number
    reason: string
    homeWorking: boolean
    category: WakeUpReasonCategory
}