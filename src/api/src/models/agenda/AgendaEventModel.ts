import { DataSource } from "../DataSource";

export interface AgendaEventModel extends DataSource{
    summary: string
    startDate: Date,
    endDate: Date,
    location: string
}