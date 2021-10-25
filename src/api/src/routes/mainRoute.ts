import * as express from "express"
import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { airPollutionAPIDataAccess } from "../dataAccess/airPollutionAPIDataAccess";
import { weatherAPIDataAccess } from "../dataAccess/weatherAPIDataAccess";
import { RoutingProfile } from "../models/direction/RoutingProfile";
import { wakeupController } from "../controllers/wakeUpController";

let router = express.Router()

router.get( "/", async ( req, res ) => {
    await wakeupController.getWakeUpTime()
    res.send(new Date())
} );

export const mainRoute = router;