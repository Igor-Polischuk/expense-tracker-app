import * as React from 'react';
import ChoosePeriod from '../../../components/ChoosePeriod';
import HorizontalBarPercentage from '../../../components/HorizontalBarPercentage';
import { MyPieChart } from '../../../components/MyPieChart';
import { useAppSelector } from '../../../hooks/redux-hooks';
import useWindowSize from '../../../hooks/useWindowSize';
import { getCategoryPercentageExpense, transactionSumByCategory } from '../../../utils/transactions';
import styles from './TransactionStats.module.scss';

const TransactionStats = () => {
    const transactions = useAppSelector(state => state.accaunt.transactions);
    const grouped = transactionSumByCategory(transactions)
    let categoryPercent = getCategoryPercentageExpense(transactions);
    categoryPercent = Object.keys(categoryPercent)
        .sort((a, b) => categoryPercent[b] - categoryPercent[a])
        .reduce<typeof categoryPercent>((obj, key, i, arr) => {
            if (i === 4) arr.splice(1);
            obj[key] = categoryPercent[key];
            return obj;
        }, {})

    const pieData = {
        labels: Object.keys(grouped),
        values: Object.values(grouped)
    }
    const [width, height] = useWindowSize();
    return (
        <div className={styles.stats}>
            <ChoosePeriod />
            <HorizontalBarPercentage title='Expenditure' data={categoryPercent} />
            <div style={{ maxHeight: (height - 70 - 21) / 2.5 }}>

            <MyPieChart pieData={pieData}/>
            </div>
        </div>
    );
}

export default TransactionStats;