import ical, { DateWithTimeZone} from "node-ical"
import { AgendaEventModel } from "../models/agenda/AgendaEventModel"

class AgendaDataAccess{

    public async getEvents(agendaUrl: URL): Promise<AgendaEventModel[]>{
        const events =  Object.values(await ical.fromURL(agendaUrl.toString()))
        return events.map<AgendaEventModel>(e => ({
            summary: e.summary.toString(),
            startDate: new Date((e.start as DateWithTimeZone)),
            endDate:  new Date((e.end as DateWithTimeZone)),
            location: e.location.toString()
        }))
    }
}

export const agendaDataAccess = new AgendaDataAccess()