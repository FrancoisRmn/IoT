import { OfficeWorkingConfigModel } from "./OfficeWorkingConfigModel";

export interface WakeUpConfigModel{
    homeAdress: string,
    workAdress: string,
    officeWorking: OfficeWorkingConfigModel
}