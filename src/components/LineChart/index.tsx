import Chart from './Chart';
import * as React from 'react';
import ChoosePeriod from '../ChoosePeriod';

import styles from './LineChart.module.scss';
import { useAppSelector } from '../../hooks/redux-hooks';
import {transactionsPerPeriod} from '../../utils/transactions';
import { TransactionI } from '../../redux/slices/accauntSlice';
import { substractDays } from '../../utils/datetime';

interface LineChartProps {
    title: string
}

const LineChart: React.FC<LineChartProps> = ({ title }) => {
    const [period, setPeriod] = React.useState('1 week')
    const {transactions} = useAppSelector(state => state.accaunt)
    const transactionPerPeriod = transactionsPerPeriod(transactions, 70);

    

    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
            <ChoosePeriod onChange={(value) => setPeriod(value)} />
            <div style={{width: '100%'}}>
                <Chart />
            </div>
        </div>
    )
}

export default LineChart;
