import React from 'react';
import { useParams } from 'react-router-dom';
import ParticipantDetails from '../../components/study/ParticipantDetails';
import ParticipantOverview from '../../components/study/ParticipantOverview';

const ParticipantRecords: React.FC = () => {
    let params = useParams();
    return (
        <div>
            <p>ParticipantRecords {params.studykey}</p>
            <ParticipantOverview />
            <ParticipantDetails />
        </div>

    );
};

export default ParticipantRecords;
