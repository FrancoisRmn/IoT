import * as express from "express"
import { wakeupController } from "../controllers/wakeUpController";
import { handleError } from "../middlewares/handleError";
import { ok } from "../middlewares/ok";
import { created } from "../middlewares/created";

let router = express.Router()

router.get( "/", async ( req, res ) => {
    await wakeupController.getWakeUpTime()
    res.send(new Date())
} );

router.post( "/config", async ( req, res ) => {
    const config = req.body;
    console.log(req.body)
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