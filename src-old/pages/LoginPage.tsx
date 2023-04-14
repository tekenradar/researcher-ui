import React from 'react';
import { Button } from 'react-bootstrap';
import Credits from '../components/Credits';

interface LoginPageProps {
}


const LoginPage: React.FC<LoginPageProps> = (props) => {
  const loginURL = process.env.REACT_APP_LOGIN_URL;


  if (!loginURL) {
    return <div className='d-flex flex-column align-items-center vh-100 justify-content-center'>
      <p className='text-danger'>Error: Login URL is missing</p>
    </div>
  }

  return (
    <div className='d-flex flex-column align-items-center vh-100 justify-content-center'>
      <div className='bg-white p-4 shadow-sm border'>
        <h1 className='h4 mb-3'>Tekenradar Researcher App</h1>
        <p>You need to login to access the content.</p>
        <Button
          className='w-100'
          onClick={() => {
            window.location.replace(loginURL);
          }}
        >
          Click here to login
        </Button>
        <p className='mt-3 fs-small text-muted mb-0'>Application is hosted and managed by RIVM.</p>
      </div>
      <Credits />
    </div>
  );
};

export default LoginPage;
