import React from 'react';
import { useParams } from 'react-router-dom';

const Settings: React.FC = () => {
  let params = useParams();

  return (
    <p className='text-center'>Settings for {params.studykey}</p>
  );
};

export default Settings;
