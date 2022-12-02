import { TransactionI } from "../redux/slices/accauntSlice";
import { substractDays } from "./datetime";

function getTransactionsSumPerDay(transactions: TransactionI[]){
    
}

//transactios for last 7 days
//transactios for last 30 days
//transactios for last 90 days
//transactios for last 180 days
//transactios for last years
export default function transactionsPerPeriod(transactions: TransactionI[], period: string): TransactionI[]{
    if (period === '1 week') return dataForDaysAgo(transactions, 7); 
    if (period === '1 mounth') return dataForDaysAgo(transactions, 30); 
    if (period === '3 mounth') return dataForDaysAgo(transactions, 90); 
    if (period === '6 mounth') return dataForDaysAgo(transactions, 180); 
    if (period === '1 year') return dataForDaysAgo(transactions, 365);
    return [];

}
function dataForDaysAgo(transactions: TransactionI[], period: number) {
    const today = new Date();
    const res: TransactionI[] = [];
    const lastWeekDay = substractDays(period, today);
     let i = 0
     while (i < transactions.length){
        const transactionDate = new Date(transactions[i].date);
        if (lastWeekDay < transactionDate){
            res.push(transactions[i])
        }else{
            break;
        }
        i++;
     }

     return res;
}



