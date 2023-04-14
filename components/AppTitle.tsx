import React from 'react';
import Image from 'next/image';

import logo from '../public/tick-logo.png';

const AppTitle: React.FC = () => {
  return (
    <div className='d-flex align-items-center'>
      <Image
        src={logo}
        alt='Tick Logo'
        width={40}
      />
      <h1 className='ms-2 mb-0 h4 fw-bold flex-grow-1'
        style={{ color: '#BC243A' }}
      >Tekenradar Researcher App</h1>
    </div>
  );
};

export default AppTitle;
