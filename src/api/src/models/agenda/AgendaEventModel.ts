import { DataSource } from "../DataSource";

export interface AgendaEventModel extends DataSource{
    startDate: Date,
    endDate: Date,
    location: string
}