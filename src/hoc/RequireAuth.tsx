import * as React from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LoadingOverlay } from '../components/LoadingOverlay';

interface RequireAuthProps {
    children: JSX.Element
}

export const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const location = useLocation();
    const [isAuth, loading] =  useAuth();
    
    if (loading){
        return <LoadingOverlay/>
    }else{
        return (isAuth) ? children : <Navigate to='/login' state={{from: location}}/>
    }
};

