import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantDetails from '../../components/study/ParticipantDetails';
import ParticipantOverview from '../../components/study/ParticipantOverview';

const ParticipantRecords: React.FC = () => {
  let params = useParams();

  const [showDetails, setShowDetails] = useState(true);
  return (
    <div className='position-relative h-100'>
      <p>ParticipantRecords {params.studykey}</p>
      <ParticipantOverview />
      <ParticipantDetails
        show={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </div>

  );
};

export default ParticipantRecords;
