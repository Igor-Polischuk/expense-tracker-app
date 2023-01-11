import * as React from 'react';
import LastTransactions from './LastTransactions';
import PaymentsModel from './PaymentsModel';
import styles from './Payments.module.scss';

const Payments = () => {
    
    return ( 
        <div className={styles.payments}>
            <PaymentsModel/>
            <LastTransactions/>
        </div>
     );
}
 
export default Payments;