import * as express from "express"
import { handleError } from "../middlewares/handleError";
import { ok } from "../middlewares/ok";
import { created } from "../middlewares/created";
import { wakeupController } from "../controllers/wakeUpController";
import { WakeUpDAO } from "../models/DAO/WakeUpDAO";

let router = express.Router()

router.get( "/", async ( req, res ) => {
    try{
        const wakeUp = await wakeupController.getWakeUp()
        ok(res, <WakeUpDAO>{
            time: wakeUp.time,
            reason: wakeUp.reason.reasonText
        })
    }catch(err){
        handleError(err,res)
    }
} );

router.post( "/config", async ( req, res ) => {
    const config = req.body;
    try{
        const conf = await wakeupController.saveConfig(config);
        created(res, conf)
    }catch(err){
        handleError(err,res)
    }
} );

router.get( "/config", async ( req, res ) => {
    try{
        const conf = await wakeupController.getConfig();
        ok(res, conf)
    } catch(err){
        handleError(err,res)
    }
} );

export const wakeUpRoute = router;