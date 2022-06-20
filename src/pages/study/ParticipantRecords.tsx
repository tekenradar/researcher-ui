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
    participantId: 134,
    name: "dummy",
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
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }, {
    sessionId: 1,
    participantId: 134,
    name: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }
  , {
    sessionId: 1,
    participantId: 134,
    name: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }
  , {
    sessionId: 1,
    participantId: 134,
    name: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }, {
    sessionId: 1,
    participantId: 134,
    name: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }
];


const ParticipantRecords: React.FC = () => {

  const [participantData, setParticipantData] = useState<ParticipantInfos>();

  return (
    <div className="d-flex w-100 h-100 table-responsive" style={{}}>
      <div className="table-responsive w-100 p-0">
        <div className="table-responsive bg-white">
          <h2 className="p-3 pb-0">Participant Records</h2>
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
        </div>
      </div>
      <ParticipantDetails
        participantDetails={participantData}
        onClose={() => setParticipantData(undefined)}
      />
    </div>
  );
};

export default ParticipantRecords;
