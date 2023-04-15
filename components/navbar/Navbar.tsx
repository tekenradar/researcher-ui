import React from 'react';
import Profile from './Profile';

import Image from 'next/image';
import logo from '../../public/tick-logo.png';

interface NavbarProps {
  email: string;
}

const Navbar: React.FC<NavbarProps> = (props) => {


  return (
    <div className='bg-white border-bottom'>
      <nav className='container-fluid d-flex py-2 align-items-center'>
        <Image
          src={logo}
          alt='Tick Logo'
          width={40}
        />
        <h1 className='ms-2 mb-0 h4 fw-bold flex-grow-1'
          style={{ color: '#BC243A' }}
        >Tekenradar</h1>
        <Profile
          email={props.email}
        />
      </nav>
    </div>
  );
};

export default Navbar;
