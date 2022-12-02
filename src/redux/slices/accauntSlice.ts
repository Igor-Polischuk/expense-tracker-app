import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fakeData from '../../data/fakeData.json';
import {generateTransactionsData} from '../../utils/random'

export interface TransactionI {
    category: string
    date: string
    type: string
    sum: number
}

interface AccauntI {
    name: string
    type: string
    currencyName: string
    paymentMethods: {
        method: string
        amount: number
    }[]
    total: number
    transactions: TransactionI[],
}

const initialState: AccauntI = {
    ...fakeData,
    transactions: generateTransactionsData()
};

// const initialState: AccauntI = {
//     name: '',
//     type: '',
//     currencyName: 'UAH',
//     paymentMethods: [
//         {
//             method: 'cash',
//             amount: 4500
//         },
//         {
//             method: 'Debit card (privat)',
//             amount: 343
//         },
//         {
//             method: 'Debit card (mono)',
//             amount: 8300
//         },
//     ],
//     total: 0,
//     transactions: []
// }

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
            state.transactions = actions.payload.transactions;
        }
    }
});

export const { setNewAccaunt } = accauntSlice.actions;
export default accauntSlice.reducer;