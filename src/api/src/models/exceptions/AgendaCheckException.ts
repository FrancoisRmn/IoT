import { AgendaEventModel } from "../agenda/AgendaEventModel";
import { CheckException } from "./CheckException";

export class AgendaCheckException extends CheckException{

    constructor(private readonly event: AgendaEventModel){
        super()
    }
}