import * as React from 'react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


import styles from './LineChart.module.scss'
import { useAppSelector } from '../../hooks/redux-hooks';

const Chart: React.FC = () => {
    const balanceHistory = useAppSelector(state => state.accaunt.balanceHistory);

    const data = Object.keys(balanceHistory).reduce<any>((arr, key) => {
        arr.push(
            {
                name: key,
                value: balanceHistory[key]
            }
        )
        return arr
    }, [])
    console.log(data);
    
    return(
        <div className={styles.chartContainer}>
            {/* <Line data={data} options={options} /> */}
            <ResponsiveContainer>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="var(--green)" fill="var(--green)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart;