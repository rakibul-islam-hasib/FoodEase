import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivetRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    if(!user) return <Navigate to='/login' replace/>
    return children;
};

export default PrivetRoute;