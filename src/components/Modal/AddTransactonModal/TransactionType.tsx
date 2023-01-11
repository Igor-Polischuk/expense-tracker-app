import * as React from 'react';
import styles from './AddTransactionModal.module.scss';

interface TransactionTypeProps{
    onChange: (type: string) => void
}

export const TransactionType: React.FC<TransactionTypeProps> = ({onChange}) => {
     const types = ['expense', 'income', 'transfer'];
    const [active, setActive] = React.useState(types[0]);

    return (
        <div className={styles.transaction__type}>
            {types.map((item) => {
                const classNames = `${styles.type__btn} ${active === item ? styles.active : ''}`
                return <button key={item} className={classNames} onClick={() => {
                    setActive(item);
                    onChange(item);
                }}>{item}</button>
            })}
        </div>
    );
};