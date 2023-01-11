import * as React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { TransactionI } from '../../redux/slices/accauntSlice';
import Transaction from './Transaction';
import styles from './Transactions.module.scss';

interface TransactionProps {
    transactions?: TransactionI[]
}

const Transactions: React.FC<TransactionProps> = () => {
    const data = useAppSelector(state => state.accaunt.transactions).slice(0, 10)

    const transactionsComponents = data.map((item, i) => <Transaction key={i} {...item}/>)

    return ( 
        <ul className={styles.transactions}>
            {transactionsComponents.length > 0 ? transactionsComponents : <p className={styles.no_transactions}>You haven't made any transactions yet</p>}
            <li className={styles.opacity}></li>
        </ul>
     );
}

export default Transactions;