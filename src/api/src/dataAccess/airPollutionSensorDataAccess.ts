import { AirPollutionModel } from "../models/air-pollution/AirPollutionModel";

class AirPollutionSensorDataAccess {

    public async getCurrentAirPollution(): Promise<AirPollutionModel>{
        //todo
        return
    }
}

export const airPollutionSensorDataAccess = new AirPollutionSensorDataAccess()