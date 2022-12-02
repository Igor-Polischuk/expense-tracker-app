import * as React from 'react';

import styles from './ChoosePeriod.module.scss';

interface ChoosePeriodProps {
    onChange?: (currentValue: string) => void
}

const ChoosePeriod: React.FC<ChoosePeriodProps> = ({onChange}) => {
    const periods = ['1 week', '1 mounth', '3 mounth', '6 mounth', '1 year'];
    const [selected, setSelected] = React.useState(periods[0])

    

    const btns = periods.map((period, i) => {
        return <button 
                key={i}
                className={`button ${styles.chooseBtn} ${selected === period ? styles.active : ''}`}
                onClick={() => {
                    setSelected(period);
                    onChange?.(period)
                }}>{period}</button>
    })

    return (
        <div className={styles.wrapper}>
            {btns}
        </div>
    )
}

export default ChoosePeriod;