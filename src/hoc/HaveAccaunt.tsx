// @flow 
import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { Link } from 'react-router-dom';
import { FirestoreHandle } from '../utils/FirestoreHandle';
import { AccauntI, setNewAccaunt } from '../redux/slices/accauntSlice';

interface HaveAccauntProps {
    children: JSX.Element
}

export const HaveAccaunt: React.FC<HaveAccauntProps> = ({ children }) => {
    const [haveAccaunt, setHaveAccaunt] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const accauntName = useAppSelector(state => state.accaunt.name)
    const dispatch = useAppDispatch();
    const uid = useAppSelector(state => state.user.uid);
    const firebaseHandle = new FirestoreHandle(uid);
    if(accauntName){
        return children
    }
    firebaseHandle.getData()
        .then(data => {
            if (JSON.stringify(data) !== JSON.stringify({})) {
                dispatch(setNewAccaunt(data as AccauntI));
                setHaveAccaunt(true);
            }
        }).finally(() => setLoading(false));
        
    return loading ? <p>Loading...</p> : (haveAccaunt ? children : <CreateAccauntSupposse />);
};

const CreateAccauntSupposse: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            height: '100%'
        }}>
            <h1>You haven't created any account yet.</h1>
            <p>Create an account first to track your finances</p>
            <Link to='/create-accaunt' className='button--filled rounded fit'>Create accaunt</Link>
        </div>
    )
}