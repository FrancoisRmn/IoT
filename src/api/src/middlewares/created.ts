import { StatusCodes } from "http-status-codes";

export function created(res: any, data:any){
    res
    .status(StatusCodes.CREATED)
    .send(data)
}