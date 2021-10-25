class GeocodingDataAccess{

    //todo
    
    public async geocode1(adress: string): Promise<[number,number]>{
        return [50.466300,4.858030]
    }

    public async geocode2(adress: string): Promise<[number,number]>{
        return [50.203490,4.889030]
    }
}

export const geocodingDataAccess = new GeocodingDataAccess()