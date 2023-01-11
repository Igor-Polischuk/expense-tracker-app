import { useAppDispatch } from '../../../hooks/redux-hooks';
import { openAddTransactionModal } from '../../../redux/slices/modalSlice';
import Transactions from '../../Transactions';
import styles from './LastTransaction.module.scss';
const LastTransactions = () => {
    const dispatch = useAppDispatch()
    return ( 
        <div className={styles.last_transactions}>
            <h2>LastTransaction:</h2>
            <Transactions/>
            <button className='button outline w100'  onClick={() => dispatch(openAddTransactionModal())}>Add new transaction</button>
        </div>
     );
}
 
export default LastTransactions;