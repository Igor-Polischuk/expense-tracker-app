import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fakeData from '../../data/fakeData.json';
import { FirestoreHandle } from "../../utils/FirestoreHandle";
import { generateTransactionsData } from '../../utils/random'


export interface TransactionI {
    category: string
    date: string
    type: string
    sum: number
    desc?: string
}

interface BalanceHistoryI {
    [date: string]: number
}

export interface AccauntI {
    name: string
    type: string
    currencyName: string
    paymentMethods: {
        method: string
        amount: number
    }[]
    total: number
    transactions: TransactionI[],
    balanceHistory: BalanceHistoryI
}

// const initialState: AccauntI = {
//     ...fakeData,
//     transactions: generateTransactionsData()
// };


const initialState: AccauntI = {
    name: '',
    type: '',
    currencyName: '',
    paymentMethods: [],
    total: 0,
    transactions: [],
    balanceHistory: {}
}

const accauntSlice = createSlice({
    name: 'accaunt',
    initialState,
    reducers: {
        setNewAccaunt: (state, actions: PayloadAction<AccauntI>) => {
            state.name = actions.payload.name;
            state.type = actions.payload.type;
            state.currencyName = actions.payload.currencyName;
            state.paymentMethods = actions.payload.paymentMethods;
            state.total = actions.payload.total;
            state.transactions = actions.payload.transactions.sort(sortTransactions);
            state.balanceHistory = sortBalanceHistory(actions.payload.balanceHistory);
        },
        setTransaction: (state, actions: PayloadAction<TransactionI>) => {
            state.transactions = [actions.payload, ...state.transactions].sort(sortTransactions)
        },
        updateTotal: (state, actions: PayloadAction<number>) => {
            state.total += actions.payload;
        },
        updadeBalanceHistory: (state, actions: PayloadAction<BalanceHistoryI>) => {
            state.balanceHistory = sortBalanceHistory(actions.payload);
        },
    }
});

const sortTransactions = (a: TransactionI, b: TransactionI) => {
    const aDate = new Date(JSON.parse(a.date)).getTime();
    const bDate = new Date(JSON.parse(b.date)).getTime();
    return bDate - aDate;
}

const sortBalanceHistory = (history: BalanceHistoryI) => {
    //'13.01.2023' => '01.13.2023'
    const dateToCorrectFormat = (str: string) => {
        const day = str.substring(0,  2);
        const mounth = str.substring(3,  5);
        const year = str.substring(6,  10);
        return `${mounth}.${day}.${year}`;
    }


return Object.keys(history)
    .sort((a: string, b: string) => {
        a = dateToCorrectFormat(a);
        b = dateToCorrectFormat(b);
        return new Date(a).getTime() - new Date(b).getTime();
    })
    .reduce<BalanceHistoryI>(
        (obj, key, _, arr) => {
            obj[key] = history[key];
            return obj
        },
        {}
    )
}

export const { setNewAccaunt, setTransaction, updateTotal, updadeBalanceHistory } = accauntSlice.actions;
export default accauntSlice.reducer;