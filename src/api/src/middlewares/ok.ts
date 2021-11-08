import { StatusCodes } from "http-status-codes";

export function ok(res: any, data?: any){
    res = res
    .status(StatusCodes.OK)
    if(data){
        res.send(data)
    } else {
        res.send()
    }
}