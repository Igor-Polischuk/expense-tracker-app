import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useAuthForm(){
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    return {errorMessage, setErrorMessage, loading, setLoading};
}