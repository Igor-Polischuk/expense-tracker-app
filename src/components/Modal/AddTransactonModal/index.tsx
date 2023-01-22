import * as React from 'react';
import useTransactionToFirebase from '../../../hooks/useTransactionToFirebase';
import Modal from '../ModalContainer';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { DatePicker } from '../../DatePicker';
import { CategorySelect } from './CategorySelect';
import { Transfer } from './Transfer';
import Loader from '../../Loader';
import { Tabs } from '../../Tabs';

import styles from './AddTransactionModal.module.scss';

export const AddTransactionModal = () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const isOpen = useAppSelector(state => state.modal.showAddTransactionModal);
    const currency = useAppSelector(state => state.accaunt.currencyName)
    const [type, setType] = React.useState('expense');
    const [sum, setSum] = React.useState('');
    const [date, setDate] = React.useState<Date>(today);
    const [category, setCategory] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [comfirmed, setComfirmed] = React.useState(false);
    const { error, loading, sendTransactionData } = useTransactionToFirebase();
    
    React.useEffect(() => {
        setType('expense');
        setSum('');
        setDate(today);
        setCategory('');
        setDesc('');
        setComfirmed(false);
    }, [isOpen])

    async function addTransaction() {
        setComfirmed(true);

        if ((sum && date && category)) {
            const newTransaction = {
                sum: (type === 'expense') ? 0 - +sum : +sum,
                type,
                date: JSON.stringify(date),
                category,
                desc
            }

            sendTransactionData(newTransaction);
        }
    }

    return (
        <Modal title='New transaction' open={isOpen}>
            <div className={styles.modal}>
                <div className={styles.sum}>
                    <p className={styles.currency__name}>{currency}</p>
                    <input type="number"
                        placeholder='Amount' value={sum}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSum(e.currentTarget.value)}
                        className={styles.ammount}
                        style={{ borderBottom: (comfirmed && !sum) ? '2px solid var(--red)' : '' }} />
                </div>
                <Tabs onChange={(str) => setType(str)} options={['expense', 'income', 'transfer']}/>
                <div className={styles.transaction__info}>

                    {type !== 'transfer' ?
                        <>
                            <CategorySelect type={type} onSelect={(val => setCategory(val.value))} valid={!(comfirmed && category === '')} />
                            <DatePicker onPick={(date) => setDate(date)}
                                style={{ color: (comfirmed && !date) ? 'var(--red)' : '' }} />
                            <textarea className={styles.transaction__descr}
                                placeholder='Describe'
                                rows={5}
                                value={desc}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.currentTarget.value)} />
                        </> : <Transfer />}
                </div>
                {loading
                    ? <><Loader />
                        <div className={styles.overlay}></div></>
                    : <button className={"button button--filled " + styles.confirm} onClick={addTransaction}>Confirm</button>}
            </div>
        </Modal>
    );
};

