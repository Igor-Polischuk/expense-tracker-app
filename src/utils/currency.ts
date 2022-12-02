import currencyList from './../data/currency.json';

interface AllList{
    currency: string
    abbreviation: string
}

export const currency = {
    all: () => currencyList,
    getSymbolByabbreviation: (abbreviation: string) => {
        return currencyList.find(item => item.abbreviation === abbreviation)?.symbol
    }
}