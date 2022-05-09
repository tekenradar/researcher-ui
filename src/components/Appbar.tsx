import React from 'react';

const Appbar: React.FC = () => {
  return (
    <div className='border-bottom d-flex justify-content-end align-items-center'>
      <span>Logged in as: {'todo'}</span>
      <button className='btn'>Logout</button>
    </div>
  );
};

export default Appbar;
