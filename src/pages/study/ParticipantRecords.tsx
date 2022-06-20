import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ParticipantDetails from "../../components/study/ParticipantDetails";
import ParticipantOverview from "../../components/study/ParticipantOverview";


interface ParticipantInfos {
  [key: string]: any;
}


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

  const [participantData, setParticipantData] = useState<ParticipantInfos>();

  return (
    <div className="d-flex w-100 h-100 table-responsive" style={{}}>
      <ParticipantOverview
        participantsRecords={dummyParticipantRecords}
        onParticipantRowClicked={(participantId: number) => {
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
        onClose={() => setParticipantData(undefined)}
      />
    </div>
  );
};

export default ParticipantRecords;
