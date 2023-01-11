import { useState, ChangeEvent, useMemo, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setNewAccaunt } from '../../redux/slices/accauntSlice';
import Input from '../../components/input';
import MySelect from '../../components/MySelect';
import Logo from '../../components/Logo';
import PaymentsMethods from './PaymetsMethods';
import { Result } from '../../components/NewPaymentMethod';
import { currency } from '../../utils/currency';
import { db } from '../../firebase';
import styles from './CreateAccauntPage.module.scss';
import { FirestoreHandle } from '../../utils/FirestoreHandle';


const CreateAccauntPage = () => {
    const dispatch = useAppDispatch();
    const options = [{ value: 'personal', label: 'Personal finance' }]
    const currencyOptions = useMemo(() => {
        return currency.all().map(item => ({ value: item.abbreviation, label: item.abbreviation }))
    }, [])

    const navigate = useNavigate();

    const [methods, setMethods] = useState<Result[]>([]);
    const [currencyName, setCurrencyName] = useState('USD')
    const [name, setName] = useState('');

    const total = methods.reduce((prev, item) => prev + item.amount, 0)
    const uid = useAppSelector(state => state.user.uid)
    const createAccaunt = (e: SyntheticEvent) => {
        e.preventDefault();
        const accaunt = {
            name,
            type: 'personal',
            currencyName,
            paymentMethods: methods,
            total,
            transactions: [],
            balanceHistory: {[new Date().toLocaleDateString()]: total}

        }
        const firestoreHandle = new FirestoreHandle(uid)
        firestoreHandle.setData(accaunt)
        // setDoc(doc(db, "users", uid), accaunt)
        dispatch(setNewAccaunt(accaunt))
        navigate('/dashboard')
    }

    return (
        <form onSubmit={createAccaunt} className={styles.container}>
            <Logo className={styles.logo} />
            <h1>Create a new accaunt</h1>
            <div className={styles.create_block}>
                <div className={styles.accaunt__type}>
                    <Input required value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} name='name' label='Accaunt name' type='text' />
                    <MySelect type='filled' title={'Accaunt type'} options={options} defaultValue={options[0]} />
                </div>
                <h2>Payments methods:</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <p>Currency: </p>
                    <MySelect
                        underline
                        type='transparent'
                        isSearchable={true}
                        options={currencyOptions}
                        defaultValue={{ value: 'USD', label: 'USD' }}
                        onChange={(value) => value && setCurrencyName(value.value)} />
                </div>
                <PaymentsMethods setMethods={setMethods} />
                <div>
                    <p className={styles.balance}>Balance: <b>{total}</b>{currency.getSymbolByabbreviation(currencyName)}</p>
                    <button type='submit' className={`button--filled ${styles.confirm}`}>Confirm</button>
                </div>
            </div>
        </form>
    );
}

export default CreateAccauntPage;