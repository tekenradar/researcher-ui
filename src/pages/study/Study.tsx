import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationMenu from '../../components/study/NavigationMenu';

const Study: React.FC = () => {
  return (
    <div className='d-flex flex-row h-100 align-items-stretch'>
      <NavigationMenu />

      <div className='flex-grow-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default Study;
