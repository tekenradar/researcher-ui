import React from 'react';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const AuthErrorPage: React.FC = () => {
  return (
    <div className="d-flex align-items-center w-100 justify-content-center vh-100 p-3">
      <div className="container">
        <h1 className="mt-0">Tekenradar Researcher UI</h1>
        <Alert variant="danger" className="">
          <h4 className="mb-3">
            <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
            Access Denied
          </h4>
          <p
            className='mb-0'
          >
            You do not have the proper rights to access this application.
            <br />
            Please contact the system administrator for more information.
          </p>
        </Alert>
      </div>
    </div>
  );
};

export default AuthErrorPage;
