import * as React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { currency } from '../../../utils/currency';
import { CustomTooltip } from './CustomTooltip';

interface IMyAreaChartProps {
    data: object[]
    x: string
    y: string
}

const MyAreaChart: React.FC<IMyAreaChartProps> = ({data, x, y}) => {
    const currencyAbbr = useAppSelector(state => state.accaunt.currencyName)
    const currencySymbol = currency.getSymbolByabbreviation(currencyAbbr)
    return (
        <div style={{ width: '100%', height: '400px' }}>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 10,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--blue)" stopOpacity={0.6} />
                            <stop offset="75%" stopColor="var(--blue)" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                    <XAxis dataKey={x} axisLine={false} tickLine={false} />
                    <YAxis unit={currencySymbol} axisLine={false} tickLine={false} domain={[(dataMin: number) => (dataMin < 0 ? dataMin : 0), 'dataMax + 1000']}/>
                    <Tooltip content={CustomTooltip}/>
                    <Area type="monotone" dataKey={y} stroke="var(--blue)" fill="url(#color)" />

                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export default MyAreaChart