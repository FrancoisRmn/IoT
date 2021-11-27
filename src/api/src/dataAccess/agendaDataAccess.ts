import moment from "moment"
import ical, { DateWithTimeZone} from "node-ical"
import { AgendaEventModel } from "../models/agenda/AgendaEventModel"
import { SystemException } from "../models/exceptions/SystemException"

class AgendaDataAccess{

    public async getEvents(agendaUrl: URL): Promise<AgendaEventModel[]>{
        if(process.env.MODE === "demo" && process.env.AGENDA === "yes"){
            return [{
                summary: "Réunion de travail",
                startDate : moment().startOf('day').add(10,'hours').toDate(),
                endDate: moment().startOf('day').add(12,'hours').toDate(),
                location: "Rue Grandgagnage 1, 5000 Namur, Belgique"
            }]
        }
        try {
            const events =  Object.values(await ical.fromURL(agendaUrl.toString()))
            return events.map<AgendaEventModel>(e => ({
                summary: e.summary.toString(),
                startDate: new Date((e.start as DateWithTimeZone)),
                endDate:  new Date((e.end as DateWithTimeZone)),
                location: e.location.toString()
            }))
        }catch(err){
            console.warn(err)
            throw new SystemException(err)
        }

    }
}

export const agendaDataAccess = new AgendaDataAccess()