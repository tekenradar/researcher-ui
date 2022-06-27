import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingButtonProps {
  className: string;
  label: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
  return (
    <button className={props.className}
      type={props.type}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.label}
      {props.loading ? <Spinner className="ms-2" animation="border" size="sm" /> : null}
    </button >
  );
};

export default LoadingButton;
