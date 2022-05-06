import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface NavigationMenuProps {
}

const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
    let params = useParams();
    return (
        <div className=''>
            <span>Study "{params.studykey}"</span>
            <Link className='m-0 p-3 d-inline-block' to="">Data exporter</Link>
            <Link className='m-0 p-3 d-inline-block' to="participant-records">Participant records</Link>
            <Link className='m-0 p-3 d-inline-block' to="settings">Settings</Link>
            <Link className='m-0 p-3 d-inline-block' to="../">Exit</Link>
        </div>
    );
};

export default NavigationMenu;
