import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { currency } from '../../utils/currency';
import styles from './BalanceInfoCard.module.scss';

interface BalanceInfoCardProps {
    title: string
    sum: number
}

const BalanceInfoCard: React.FC<BalanceInfoCardProps> = ({ title, sum }) => {
    const currencyName = useAppSelector(state => state.accaunt.currencyName);
    const currencySymbol = currency.getSymbolByabbreviation(currencyName);
    const classNames = (sum < 0 ) ? styles.sum + ' ' +  styles.negativeBalance : styles.sum;
    return (
        <div className={styles.BalanceInfoCard}>
            <p className={styles.title}>{title}</p>
            <p className={classNames}>{sum} {currencySymbol}</p>
        </div>
    );
}

export default BalanceInfoCard;