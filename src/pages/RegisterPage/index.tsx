import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc} from 'firebase/firestore';
import { db } from '../../firebase';
import AuthForm from '../../components/AuthForm';
import Input from '../../components/input';
import useAuth from '../../hooks/useAuthForm';
import Loader from '../../components/Loader';

const LoginPage: React.FC = () => {
    const emailInputRef = React.useRef<HTMLInputElement>(null)
    const passwordInputRef = React.useRef<HTMLInputElement>(null)
    const passwordRepeatInputRef = React.useRef<HTMLInputElement>(null)

    const { loading, setLoading, errorMessage, setErrorMessage } = useAuth();

    let navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const email = emailInputRef.current ? emailInputRef.current.value : '';
        const password = passwordInputRef.current ? passwordInputRef.current.value : '';
        const rePassword = passwordRepeatInputRef.current ? passwordRepeatInputRef.current.value : '';
        if (password === rePassword) {
            const auth = getAuth();
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setErrorMessage('');
                    setLoading(false);
                    return user;
                })
                .then(user => {
                    setDoc(doc(db, "users", user.uid), {})

                    navigate('/create-accaunt')
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                    setLoading(false);
                })
        } else {
            setErrorMessage('Password is different');
        }

    }

    return (
        <AuthForm title='Sign Up'>
            <>
                <form onSubmit={onSubmit}>
                    <Input style={{ marginBottom: '20px' }} refprop={emailInputRef} name='email' label='Email' type='email' />
                    <Input style={{ marginBottom: '20px' }} refprop={passwordInputRef} name='password' label='Password' type='password' />
                    <Input style={{ marginBottom: '20px' }} refprop={passwordRepeatInputRef} name='repeat-pass' label='Repeat password' type='password' />
                    <p className="error_text">{errorMessage}</p>
                    {loading ? <Loader /> : <button type='submit' className='button--filled rounded'>Sign in</button>}
                </form>
                <p style={{ fontSize: '12px', textAlign: 'center' }}>Already have an accaunt? <Link to='/login'>Sign in</Link></p>
            </>
        </AuthForm>
    );
}

export default LoginPage;