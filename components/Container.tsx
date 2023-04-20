import clsx from 'clsx';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div className={clsx(
      'container-fluid container-lg',
      props.className
    )}>
      {props.children}
    </div>
  );
};

export default Container;
