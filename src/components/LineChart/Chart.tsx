import * as React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartData,
    ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from './LineChart.module.scss'
import { useAppSelector } from '../../hooks/redux-hooks';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
export const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        // title: {
        //     display: true,
        //     text: 'Ballance history',
        // },
    },
};

const Chart: React.FC = () => {
    const balanceHistory = useAppSelector(state => state.accaunt.balanceHistory);
    
    const data: ChartData<"line", number[], string> = {
        labels: Object.keys(balanceHistory).length > 1 ? Object.keys(balanceHistory) : [...Object.keys(balanceHistory), ...Object.keys(balanceHistory)],
        datasets: [{
            label: "Balance",
            data: Object.values(balanceHistory).length > 1 ? Object.values(balanceHistory) : [...Object.values(balanceHistory), ...Object.values(balanceHistory)],
            fill: "start",
            tension: 0.4,
            backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "rgba(76, 211, 194, 1)");
                gradient.addColorStop(0.5, "rgba(76, 211, 194, 0.7)");
                gradient.addColorStop(1, "rgba(76, 211, 194, 0.4)");
                return gradient;
            },
            borderColor: "rgba(75,192,192,1)"
        },]
    };

    return (
        <div className={styles.chartContainer}>
            <Line data={data} options={options} />
        </div>
    )
}

export default Chart;