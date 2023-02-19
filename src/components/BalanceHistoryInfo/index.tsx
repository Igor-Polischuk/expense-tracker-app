// import Chart from './Chart';
import * as React from 'react';
import ChoosePeriod from '../ChoosePeriod';

import styles from './LineChart.module.scss';
import { useAppSelector } from '../../hooks/redux-hooks';
import { transactionsPerPeriod } from '../../utils/transactions';
import { TransactionI } from '../../redux/slices/accauntSlice';
import { substractDays } from '../../utils/datetime';
import  MyAreaChart  from './MyAreaChart/MyAreaChart';
import { currency } from '../../utils/currency';

interface LineChartProps {
    title: string
}

const LineChart: React.FC<LineChartProps> = ({ title }) => {
    const [period, setPeriod] = React.useState('1 week')
    const { transactions } = useAppSelector(state => state.accaunt)
    const transactionPerPeriod = transactionsPerPeriod(transactions, 70);

    const balanceHistory = useAppSelector(state => state.accaunt.balanceHistory);
    const currencyName = useAppSelector(state => state.accaunt.currencyName)
    const currencySymbol = currency.getSymbolByabbreviation(currencyName)

    const data = Object.keys(balanceHistory).reduce<{ date: string, balance: number }[]>((arr, key) => {
        arr.push(
            {
                date: key,
                balance: balanceHistory[key]
            }
        )
        return arr
    }, [])

    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
            <ChoosePeriod onChange={(value) => setPeriod(value)} />
            <MyAreaChart data={data} x="date" y="balance"/>
        </div>
    )
}

export default LineChart;
