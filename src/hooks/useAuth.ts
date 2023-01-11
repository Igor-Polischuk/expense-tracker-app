import { useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { setUser } from '../redux/slices/userSlice';

function useAuth() {
    const userUID = useAppSelector(state => state.user.uid)

    const [isAuth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    if (userUID) return [true, false]

    getUser().then(user => {
        if (user) {
            const email = user.email ? user.email : '';
            const uid = user.uid;
            dispatch(setUser({
                email, uid
            }))
            setAuth(true);
            setLoading(false);
        } else {
            setLoading(false);
            dispatch(setUser({
                email: '',
                uid: ''
            }))
        }
    })
    return [isAuth, loading];
}

function getUser(): Promise<User | null> {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        }, reject)
    })
}

export default useAuth;