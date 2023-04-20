'use client';

import clsx from 'clsx';
import React from 'react';

interface EditorSectionProps {
  title: string, description: string,
  className?: string,
  children: React.ReactNode,
  action?: React.ReactNode,
}

const Card: React.FC<{ className?: string, children: React.ReactNode; }> = (props) => {
  return <div className={clsx('bg-white shadow-sm rounded overflow-hidden', props.className)}>
    {props.children}
  </div>
}

const EditorSection: React.FC<EditorSectionProps> = (props) => {
  return <div className={clsx(
    'row mt-3', props.className
  )}>
    <div className='col-12 col-md-4'>
      <h3 className='h5'>{props.title}</h3>
      <p className='text-muted fs-small'>{props.description}</p>
    </div>
    <div className='col-12 col-md-8'>
      <Card>
        <div className='p-3'>
          {props.children}
        </div>
        <div className='text-end p-3 bg-light'>
          {props.action}
        </div>

      </Card>
    </div>
  </div>
};

export default EditorSection;
