import * as express from "express"
import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { airPollutionAPIDataAccess } from "../dataAccess/airPollutionAPIDataAccess";
import { weatherAPIDataAccess } from "../dataAccess/weatherAPIDataAccess";
import { RoutingProfile } from "../models/direction/RoutingProfile";
import { wakeupController } from "../controllers/wakeUpController";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

let router = express.Router()

router.get( "/", async ( req, res ) => {
    await wakeupController.getWakeUpTime()
    res.send(new Date())
} );

router.post( "/config", async ( req, res ) => {
    const config = req.body;
    wakeupController.saveConfig(config);
    res
        .status(StatusCodes.CREATED)
        .send()
} );

router.get( "/config", async ( req, res ) => {
    const conf = wakeupController.getConfig();
    res
        .status(StatusCodes.OK)
        .send(conf)
} );

export const wakeUpRoute = router;