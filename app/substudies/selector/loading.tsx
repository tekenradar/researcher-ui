import LoadingScreen from '@/components/LoadingScreen';
import React from 'react';

interface loadingProps {
}

const loading: React.FC<loadingProps> = (props) => {
  return (
    <LoadingScreen />
  );
};

export default loading;
