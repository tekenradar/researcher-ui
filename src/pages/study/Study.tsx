import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationMenu from '../../components/study/NavigationMenu';

const Study: React.FC = () => {
    return (
        <div>
            <div>
                <NavigationMenu />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Study;
