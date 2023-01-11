import { setTransaction, updateTotal, TransactionI, updadeBalanceHistory } from './../redux/slices/accauntSlice';
import * as React from 'react';
import { collection, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { closeModal } from '../redux/slices/modalSlice';

export default function useTransactionToFirebase() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const uid = useAppSelector(state => state.user.uid);
    let {total, balanceHistory} = useAppSelector(state => state.accaunt);
    const dispatch = useAppDispatch();
    async function sendTransactionData(transaction: TransactionI) {
        setLoading(true);
        const {sum, date} = transaction;
        const localeDateStr = new Date(JSON.parse(date)).toLocaleDateString(); 
        total += sum;
        balanceHistory = {...balanceHistory, [localeDateStr]: total};
        
        try {
            const userRef = collection(db, "users");
            await updateDoc(doc(userRef, uid), { 'transactions': arrayUnion(transaction) });
            await setDoc(doc(userRef, uid), { total, balanceHistory }, {merge: true});
            dispatch(setTransaction(transaction));
            dispatch(updateTotal(sum));
            dispatch(updadeBalanceHistory(balanceHistory))
            dispatch(closeModal());
        }catch(e){
            setError(true);
        }finally{
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        sendTransactionData
    }
}