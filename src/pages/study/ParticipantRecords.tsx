import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ParticipantDetails from "../../components/study/ParticipantDetails";
import ParticipantOverview from "../../components/study/ParticipantOverview";

const dummyParticipantRecords = [
  {
    sessionId: 1,
    participantId: 1234,
    name: "dummy",
    otherContactInfo: "dummyContact",
    ExtraConcent: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  },
  {
    sessionId: 1,
    participantId: 134,
    name: "dummy",
    otherContactInfo: "dummyContact",
    ExtraConcent: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  },
  {
    sessionId: 1,
    participantId: 124,
    name: "dummy",
    otherContactInfo: "dummyContact",
    ExtraConcent: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  },
  {
    sessionId: 1,
    participantId: 12340,
    name: "dummy",
    otherContactInfo: "dummyContact",
    ExtraConcent: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  },
];
const ParticipantRecords: React.FC = () => {
  let params = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const [participantData, setParticipantData] = useState({});
  return (
    <div className="position-relative h-100">
      <p className="text-center"> ParticipantRecords {params.studykey}</p>
      <ParticipantOverview
        participantsRecords={dummyParticipantRecords}
        onParticipantRowClicked={(participantId: number) => {
          setShowDetails(true);
          dummyParticipantRecords.map((element) => {
            if (element.participantId === participantId) {
              setParticipantData(element);
            }
            return null;
          });
        }}
      />
      <ParticipantDetails
        participantDetails={participantData}
        show={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </div>
  );
};

export default ParticipantRecords;
