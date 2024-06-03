import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/sign-in');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? element : null;
};

export default ProtectedRoute;
