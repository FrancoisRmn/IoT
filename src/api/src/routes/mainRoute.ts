import * as express from "express"
import { weatherAPIDataAccess } from "../dataAccess/weatherAPIDataAccess";

let router = express.Router()

router.get( "/", async ( req, res ) => {
    res.send(await weatherAPIDataAccess.getCurrentWeather(50.200070,5.317480))
} );

export const mainRoute = router;