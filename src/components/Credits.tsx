import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Credits: React.FC = () => {
  return (
    <div className='text-center text-muted py-3' style={{
    }}>
      <p className='m-0 fs-small'>© 2022 Tekenradar Researcher App v{process.env.REACT_APP_VERSION}</p>

      <a
        href='https://coneno.com'
        className="btn text-muted fs-small"
      >
        coneno GmbH
        <FontAwesomeIcon
          className='ms-1'
          size='sm'
          icon={faArrowUpRightFromSquare} />
      </a>

    </div>
  );
};

export default Credits;
