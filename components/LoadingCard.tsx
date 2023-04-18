'use client';

import React from 'react';
import { Spinner } from 'react-bootstrap';
import clsx from 'clsx';

interface LoadingCardProps {
  height?: string;
  className?: string;
}

const LoadingCard: React.FC<LoadingCardProps> = (props) => {

  return (
    <div className={clsx(
      "d-flex align-items-center w-100 justify-content-center bg-white rounded",
      props.className
    )} style={{
      height: props.height || '100%',
    }}>
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
    </div>
  );

};

export default LoadingCard;
