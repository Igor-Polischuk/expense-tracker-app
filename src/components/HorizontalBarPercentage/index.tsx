import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './HorizontalBarPercentage.module.scss';

interface HorizontalBarPercentageI {
    title: string
    data: {
        [label: string]: number
    }
}

const HorizontalBarPercentage: React.FC<HorizontalBarPercentageI> = ({title, data}) => {
    
    return (
            <div className={styles.stats}>
                <h3>{title}</h3>
                <br />
                <div className={styles.wrapper}>
                {Object.keys(data).sort((a, b) => data[b] - data[a]).map(item => {
                    return <Bar key={uuidv4()} title={item} percent={data[item]}/>
                })}
                </div>
            </div>
    );
}

export default HorizontalBarPercentage;

const Bar: React.FC<{title: string, percent: number}> = ({title, percent}) => {
    return (
        <div className={styles.bar}>
            <p>{title}</p>
            <div className={styles.line}><div style={{width: `${percent}%`}}/><span>{percent}%</span></div>
        </div>
    )
}