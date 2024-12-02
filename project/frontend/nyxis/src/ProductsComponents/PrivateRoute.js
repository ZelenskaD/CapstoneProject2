import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../OtherComponents/UserContext';

function PrivateRoute({ children, requiredUser }) {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    if (requiredUser && currentUser.username !== requiredUser) {
        // Redirect to homepage if the user is not authorized for the specific route
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
