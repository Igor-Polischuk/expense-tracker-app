import * as React from 'react';
import TransactionHistory from './TransactionHistory';
import styles from './TransactionPage.module.scss';
import TransactionStats from './TransactionsStats';

const TransactionPage = () => {
    
    return (
        <div className={styles.transactionPage}>
            <TransactionHistory/>
            <TransactionStats/>
        </div>
    );
}

export default TransactionPage;