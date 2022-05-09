import clsx from 'clsx';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

interface NavigationMenuProps {
}


const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  let params = useParams();
  return (
    <div className='border-end h-100 d-flex flex-column' style={{ minHeight: '100%', width: 200 }}>
      <h1 className='p-3 m-0 fs-5'>Study "{params.studykey}"</h1>
      <Nav className="flex-column px-3 flex-grow-1">
        <NavLink className={({ isActive }) => clsx('nav-link', { 'active fw-bold': isActive })}
          to="exporter">
          Data exporter
        </NavLink>
        <NavLink className={({ isActive }) => clsx('nav-link', { 'active fw-bold': isActive })}
          to="participant-records">
          Participant records
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx('nav-link', { 'active fw-bold': isActive })}
          to="settings">
          Settings
        </NavLink>
        <div className='flex-grow-1'></div>
        <NavLink
          className={'nav-link text-danger pb-4 fw-bold'}
          to="../">
          Exit
        </NavLink>

      </Nav>
    </div>
  );
};

export default NavigationMenu;
