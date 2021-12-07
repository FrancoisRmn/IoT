import moment from "moment"

export function formatDate(date: Date): string{
    return date.toLocaleTimeString()
}

export function formatTime(time: number): string{
    return moment()
    .startOf('day')
    .seconds(time)
    .format("h:mm:ss a")
}

export function secondsToMinutes(n: number): number{
    return n/60
}