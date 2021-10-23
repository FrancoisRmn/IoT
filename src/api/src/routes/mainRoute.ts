import * as express from "express"
import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { airPollutionAPIDataAccess } from "../dataAccess/airPollutionAPIDataAccess";
import { weatherAPIDataAccess } from "../dataAccess/weatherAPIDataAccess";
import { RoutingProfile } from "../models/direction/RoutingProfile";

let router = express.Router()

router.get( "/", async ( req, res ) => {
    res.send(new Date())
} );

export const mainRoute = router;