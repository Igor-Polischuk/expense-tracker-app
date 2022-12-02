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

    return (
        <div className={styles.BalanceInfoCard}>
            <p className={styles.title}>{title}</p>
            <p className={styles.sum}>{sum} {currencySymbol}</p>
        </div>
    );
}

export default BalanceInfoCard;