import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { Tabs } from '../../../components/Tabs';
import { splitTransactionByDate } from '../../../utils/transactions';
import Transactions from '../../../components/Transactions';
import { v4 as uuidv4 } from 'uuid';
import { getDateString } from '../../../utils/datetime';
import { openAddTransactionModal } from '../../../redux/slices/modalSlice';
import styles from './TransactionHistory.module.scss';
import useWindowSize from '../../../hooks/useWindowSize';

const TransactionHistory = () => {
    const [currentFilter, setCurrentFilter] = React.useState('all');
    let transactions = useAppSelector(state => state.accaunt.transactions);
    const dispatch = useAppDispatch();
    transactions = transactions.filter(item => {
        switch(currentFilter){
            case 'all':
                return true;
            case 'expense':
                return item.type === currentFilter;
            case 'income':
                return item.type === currentFilter;
        }
    })
    const splited = React.useMemo(() => splitTransactionByDate(transactions), [transactions]);
    const [width, height] = useWindowSize();
    return (
            <div className={styles.transaction__history} style={{maxHeight: height - 70 - 21}}>
                <h2>Transaction history</h2>
                <Tabs onChange={(value) => {setCurrentFilter(value.toLocaleLowerCase())}} options={['all', 'expense', 'income']} className={styles.transaction__filter} />
                <ul className={styles.transaction__wrapper}>
                    {Object.keys(splited).map(date => {
                        return <li key={uuidv4()} className={styles.transaction__list_item}>
                            <h3 className={styles.date__header}>{getDateString(new Date(JSON.parse(date)))}</h3>
                            <Transactions transactions={splited[date]}/>
                        </li>
                    })}
                </ul>
                <button className={`button outline w100`}  onClick={() => dispatch(openAddTransactionModal())}>Add new transaction</button>
            </div>
    );
}

export default TransactionHistory;