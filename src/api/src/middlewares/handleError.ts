import { StatusCodes } from "http-status-codes";
import { SystemException } from "../models/exceptions/SystemException";

export function handleError(err: Error, res: any){
    console.warn(err)
    switch(err.constructor){
        case SystemException :{
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(err)
        }
        default :{
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(err) 
        }
    }
}