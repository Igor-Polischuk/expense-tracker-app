import * as React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import google from '../../assets/svg/googleIco.svg';
import styles from './AuthForm.module.scss'


export const GoogleBtn = ({title} : {title: string}) => {
    let navigate = useNavigate();
    const googleAuth = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const email = user.email as string;
                const uid = user.uid;
                navigate('/dashboard')
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorMessage, credential);
            });
    }
    return (<button onClick={googleAuth} className={styles.googleBtn}>
        <img src={google} alt={`goole ${title}`} />
        <span>{title} with Google</span>
    </button>);
};