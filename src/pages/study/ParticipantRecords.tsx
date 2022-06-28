import React, { useState } from "react";
import Credits from "../../components/Credits";
import ParticipantDetails from "../../components/study/ParticipantDetails";
import ParticipantOverview from "../../components/study/ParticipantOverview";


interface ParticipantInfos {
  [key: string]: any;
}


const dummyParticipantRecords = [
  {
    sessionId: 1,
    participantId: 'ab4654s32s1d354we534r3d1s3df1',
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
    participantId: 'ab4654s32s1d354we534r3d1s3df2',
    name: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }, {
    sessionId: 1,
    participantId: 'ab4654s32s1d354we534r3d1s3df3',
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
    participantId: 'ab4654s32s1d354we534r3d1s3df4',
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
    participantId: 'ab4654s32s1d354we534r3d1s3df5',
    name: "dummy",
    Age: 34,
    sex: "M",
    baseLineSurvey: true,
    dateTime: "23.11.55",
    noOfResearcherRecord: 4,
    lastResearch: "dummyResearch",
  }, {
    sessionId: 1,
    participantId: 'ab4654s32s1d354we534r3d1s3df6',
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
    <div className="d-flex w-100 table-responsive" style={{}}>
      <div className="table-responsive w-100 p-0">
        <div className="table-responsive bg-white">
          <h2 className="p-3 pb-0">Participant Records</h2>
          <ParticipantOverview
            participantsRecords={dummyParticipantRecords}
            onParticipantRowClicked={(participantId: string) => {
              dummyParticipantRecords.map((element) => {
                if (element.participantId === participantId) {
                  setParticipantData(element);
                }
                return null;
              });
            }}
          />
        </div>
        <Credits />
      </div>
      <ParticipantDetails
        participantDetails={participantData}
        onClose={() => setParticipantData(undefined)}
      />
    </div>
  );
};

export default ParticipantRecords;
