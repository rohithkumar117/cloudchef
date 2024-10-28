import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';

const Layout = ({ children }) => {
    const location = useLocation();
    const noBackButtonPaths = ['/', '/welcome']; // Paths where the back button is not needed

    return (
        <div>
            {!noBackButtonPaths.includes(location.pathname) && <BackButton />}
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
