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


export function transactionSumPerDay(transactions: TransactionI[], day: Date) {
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

    return sum;
    // return transactions.reduce((prev, current, i, arr) => {        
    //     return (day.toDateString() === new Date(current.date).toDateString()) ? prev + current.sum : prev + 0;
    // }, 0)
}

export function transactionSumByCategory(transactions: TransactionI[]) {
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

export function splitTransactionByDate(transactions :TransactionI[]){
    const res: {[date: string]: TransactionI[]} = {}; 
    transactions.forEach(transaction => {
        const date = transaction.date;
        if (res[date] === undefined){
            res[date] = [transaction];
        }else{
            res[date].push(transaction);
        }
    })

    return res;
}

export function getCategoryPercentageExpense(transactions: TransactionI[]){
    transactions = transactions.filter(transaction => transaction.type === 'expense');

    const totalExpenseSum = transactions.reduce((acc, current) => Math.abs(current.sum) + acc, 0);
    const grouped = transactionSumByCategory(transactions);
    const categoryPercentageFromExpenses: typeof grouped = {};
    for (const key in grouped){
        const percent = Math.ceil(Math.abs(grouped[key]) / totalExpenseSum * 100);
        categoryPercentageFromExpenses[key] = percent;
    }
    return categoryPercentageFromExpenses;
    
}
