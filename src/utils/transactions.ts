import { TransactionI } from "../redux/slices/accauntSlice";
import { substractDays } from "./datetime";

export function transactionsPerPeriod(transactions: TransactionI[], days: number) {
    const today = new Date();
    const lastDay = substractDays(days);
    const res: TransactionI[] = [];

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const transationDate = new Date(transaction.date);
        if (transationDate.getTime() - lastDay.getTime() > 0) {
            res.push(transaction);
        } else {
            break;
        }
    }

    return res;
}


function transactionSumPerDay(transactions: TransactionI[], day: Date) {
    const dayTime = new Date(day.toDateString()).getTime();
    let sum = 0;

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const transactionTime = new Date(transaction.date).getTime();
        if (dayTime === transactionTime) {
            sum += transaction.sum;
        } else if (transactionTime < dayTime) {
            break
        }
    }

    return sum
    // return transactions.reduce((prev, current, i, arr) => {        
    //     return (day.toDateString() === new Date(current.date).toDateString()) ? prev + current.sum : prev + 0;
    // }, 0)
}

function transactionSumByCategory(transactions: TransactionI[]) {
    const res: { [category: string]: number } = {}
    transactions.forEach(transaction => {
        if (res[transaction.category]) {
            res[transaction.category] += transaction.sum;
        } else {
            res[transaction.category] = transaction.sum;
        }
    })

    return res;
}


