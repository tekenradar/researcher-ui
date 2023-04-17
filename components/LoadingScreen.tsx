'use client';

import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen: React.FC = () => {
  return (
    <div className="d-flex align-items-center w-100 justify-content-center" style={{
      paddingTop: '80px',
    }}>
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
    </div>
  );
};

export default LoadingScreen;
