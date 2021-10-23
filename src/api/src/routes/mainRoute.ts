import * as express from "express"
import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { airPollutionAPIDataAccess } from "../dataAccess/airPollutionAPIDataAccess";
import { weatherAPIDataAccess } from "../dataAccess/weatherAPIDataAccess";
import { RoutingProfile } from "../models/direction/RoutingProfile";

let router = express.Router()

router.get( "/", async ( req, res ) => {
    res.send(await directionAPIDataAccess.getDirection(RoutingProfile.DRIVING,50.203621,4.891570,50.467388,4.871985))
} );

export const mainRoute = router;