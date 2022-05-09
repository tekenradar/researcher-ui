import React from 'react';
import { Link } from 'react-router-dom';

const dummyStudies = [
  { key: 'dummy', name: 'Dummy study' },
  { key: 'dummy-2', name: 'Dummy study 2' },
]

const StudySelector: React.FC = () => {
  return (
    <div>
      {dummyStudies.map(study => <div key={study.key}>
        <Link className='d-block p-2' to={study.key}>{study.name}</Link>
      </div>)}
    </div>
  );
};

export default StudySelector;
