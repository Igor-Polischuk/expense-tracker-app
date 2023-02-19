import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

import styles from './CustomTooltip.module.scss'

export const CustomTooltip:ContentType<ValueType, NameType> = ({label, active, payload}) => {
    
    if(active && payload && payload[0]){
        return (
            <div className={styles.custom__tooltip}>
                <p className={styles.label}>{label}</p>
                <p>{payload[0].value}</p>
            </div>
        );
    }
    return null
};