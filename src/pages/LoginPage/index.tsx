import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import AuthForm from '../../components/AuthForm';
import Input from '../../components/input';
import useAuth from '../../hooks/useAuthForm';
import Loader from '../../components/Loader';

const LoginPage: React.FC = () => {
    const emailInputRef = React.useRef<HTMLInputElement>(null)
    const passwordInputRef = React.useRef<HTMLInputElement>(null)

    const {loading, setLoading, errorMessage, setErrorMessage} = useAuth();
    let navigate = useNavigate();

    
    const onSubmit = (e: React.FormEvent) => {
        const email = emailInputRef.current ? emailInputRef.current.value : '';
        const password = passwordInputRef.current ? passwordInputRef.current.value : '';

        e.preventDefault()
        const auth = getAuth();
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false)
                navigate('/dashboard')
            })
            .catch((error) => {
                setErrorMessage(error.message);
                console.log(errorMessage);
                setLoading(false)
            });
    }

    return (
        <AuthForm title='Sign in'>
            <>
                <form onSubmit={onSubmit}>
                    <Input style={{marginBottom: '20px'}} refprop={emailInputRef}  name='email' label='Email' type='email' />
                    <Input refprop={passwordInputRef}  name='password' label='Password' type='password' />
                    {/* <CheckBox label='Remember me' id='remember-checkbox' /> */}
                    {loading ? <Loader/> : <button style={{ marginTop: '20px' }} type='submit' className='button--filled rounded'>Sign in</button>}
                    <p className="error_text">{errorMessage}</p>
                </form>
                <p style={{ fontSize: '12px', textAlign: 'center' }}>Don't have an account? <Link to='/register'>Register now</Link></p>
            </>
        </AuthForm>
    );
}

export default React.memo(LoginPage);