'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorComp({
  error
}: { error: Error }) {



  return (
    <div className="d-flex align-items-center w-100 justify-content-center" style={{
      paddingTop: '80px',
    }}>
      <div className='text-center'>
        <div className="alert alert-danger">
          <h1 className="h4">Error</h1>
          <p className='p-0 m-0'>{error.message}</p>

        </div>
        <Link href='/substudies/selector'
          className='btn btn-primary mt-2'
        >Go to substudy selector</Link>
      </div>
    </div>
  );
};
