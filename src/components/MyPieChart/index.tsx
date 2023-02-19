import React from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

import styles from './PieChart.module.scss';

interface PieChartProps {
    pieData: {
        labels: string[],
        values: number[]
    }
}

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export const MyPieChart: React.FC<PieChartProps> = ({ pieData }) => {
    const [activeIndex, setActiveIndex] = React.useState(1)

    const data = [
        {
            value: 132,
            label: 'test1'
        },
        {
            value: 300,
            label: 'test2'
        },
        {
            value: 634,
            label: 'test3'
        },
        {
            value: 21,
            label: 'test4'
        },
    ]

    const COLORS = new Array(data.length).fill(generateRandomColor())

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={(_, i) => setActiveIndex(i)}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

function generateRandomColor(): string {
    // Генеруємо випадкові числа для кожного кольору (червоного, зеленого і синього)
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Об'єднуємо числа в строку в форматі RGB
    const color = `rgba(${red}, ${green}, ${blue}, 0.5)`;

    return color;
}