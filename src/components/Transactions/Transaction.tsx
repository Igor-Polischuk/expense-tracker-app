import * as React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { TransactionI } from '../../redux/slices/accauntSlice';
import { currency } from '../../utils/currency';
import styles from './Transactions.module.scss';

const CategoryIco: React.FC<{ category: string }> = ({ category }) => {
    const letter = category[0]
    return <div className={styles.category_name}>{letter}</div>
}

const Transaction: React.FC<TransactionI> = ({ category, sum, date, type }) => {
    const { currencyName } = useAppSelector(state => state.accaunt);
    const currencySymbol = currency.getSymbolByabbreviation(currencyName)

    const color = sum >= 0 ? 'var(--green)' : 'var(--red)';
    date = new Date(JSON.parse(date)).toLocaleDateString();
    
    return (
        <li className={styles.transaction}>
            <div className={styles.category}>
                <div className={styles.category__tooltip}>{category}</div>
                <CategoryIco category={category} />
                <span>{category.length > 9 ? category.substring(0, 9) + '...' : category}</span>
            </div>
            <span className={styles.date}>{date}</span>
            <span className={styles.sum} style={{color}}>{sum > 0 ? '+' : ''}{sum}{currencySymbol}</span>
        </li>
    );
}

export default Transaction;