export function substractDays(numOfDays: number, date = new Date()){
    return new Date(date.setDate(date.getDate() - numOfDays))
}