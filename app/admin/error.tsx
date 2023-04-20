'use client';

import Container from '@/components/Container';
import React from 'react';

interface errorProps {
  error: Error;
}

const ErrorPage: React.FC<errorProps> = (props) => {
  return (
    <Container >
      <div className='alert alert-danger my-4'>
        {props.error.message}
      </div>
    </Container>

  );
};

export default ErrorPage;
