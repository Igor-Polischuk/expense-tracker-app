import * as React from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { openAddPaymentsMethodModal } from '../../../redux/slices/modalSlice';
import AvailableMethods from './AvailableMethods';
import styles from './PaymentsModel.module.scss';

const PaymentsModel = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.paymentsModel}>
            <h2>Payments</h2>
            <div className={styles.header}>

                <p>Payments model</p>
                <button className='button outline' onClick={() => dispatch(openAddPaymentsMethodModal())}>Add method</button>
            </div>
            <AvailableMethods />
        </div>
    );
}

export default PaymentsModel;