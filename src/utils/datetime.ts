export function substractDays(numOfDays: number, date = new Date()){
    return new Date(date.setDate(date.getDate() - numOfDays))
}

export function getDateString(date: Date){
    const mounth: {[num: number]: {en: string}} = {
        0: {
            en: 'January'
        },
        1: {
            en: 'February'
        },
        2: {
            en: 'March'
        },
        3: {
            en: 'April'
        },
        4: {
            en: 'May'
        },
        5: {
            en: 'June'
        },
        6: {
            en: 'July'
        },
        7: {
            en: 'August'
        },
        8: {
            en: 'September'
        },
        9: {
            en: 'October'
        },
        10: {
            en: 'November'
        },
        11: {
            en: 'December'
        },

    };

    let ending = 'th';

    if(date.getDate() === 1 || date.getDate() === 21 || date.getDate() === 31) ending = 'st';
    else if (date.getDate() === 2 || date.getDate() === 22) ending = 'nd';
    else if (date.getDate() === 3 || date.getDate() === 23) ending = 'td';

    return `${date.getDate()}${ending} ${mounth[date.getMonth()].en}`;
}