import React from 'react';

const Unavailable: React.FC = () => {
  return (
    <div className='p-3 w-100'>
      <div className='bg-white p-3'>
        <h5>Error loading this feature</h5>
        <p>Please reload the study or use one of the available features.</p>
      </div>
    </div>
  );
};

export default Unavailable;
