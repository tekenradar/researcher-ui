'use client'

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Spinner } from 'react-bootstrap';
import AppTitle from './AppTitle';

interface LoginProps {
}

const Login: React.FC<LoginProps> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);


  return (
    <div className='bg-white shadow p-3 rounded'
      style={{ maxWidth: '500px' }}
    >
      <AppTitle />
      <div className='p-2 alert alert-info mt-4'>
        <p>This application provides access to substudies of the Tekenradar project.</p>
        <p className='mb-0'>Features include: data export, and in specific cases, participant contact access.</p>
      </div>
      <p className='text-center'>Please login to access the researcher portal.</p>

      <button
        className='btn btn-primary w-100'
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          //await signIn('rivm-adfs', {
          await signIn('dummy-login', {
            redirect: false,
          });
          setIsLoading(false);
          router.push('/substudies/selector');
        }}>Login via RIVM Account
        {isLoading ?? <Spinner />}
      </button>
    </div>

  );
};

export default Login;
