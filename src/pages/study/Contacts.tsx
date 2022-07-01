import React, { useState } from "react";
import Credits from "../../components/Credits";
import EmailNotifications from "../../components/study/contacts/EmailNotifications";
import ParticipantDetails from "../../components/study/ParticipantDetails";
import ParticipantOverview from "../../components/study/ParticipantOverview";


interface Note {
  time: number;
  author: string;
  content: string;
}

export interface ParticipantSessionData {
  sessionID: string;
  participantID: string;
  general: { [key: string]: any };
  confidentialData?: { [key: string]: any };
  notes?: Note[];
}


const dummyParticipantRecords: ParticipantSessionData[] = [
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    sessionID: '621394a1a0919b93',
    participantID: 'a3b960c17ea4de7d4e267c754dbbe9eaeba54bf5a1da8d5d90b59bcd0cfef1a6',
    general: {
      Age: 24,
      sex: "M",
    },
    confidentialData: {
      firstName: 'First',
      lastName: 'Last'
    },
    notes: [
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
      {
        time: 1665456465,
        author: 'test@test.nl',
        content: `Hi\n\nHow are you?`
      },
    ]
  },
];


const Contacts: React.FC = () => {

  const [participantData, setParticipantData] = useState<ParticipantSessionData>();

  return (
    <div className="d-flex w-100 table-responsive" style={{}}>
      <div className="table-responsive w-100 p-3">
        <div className="table-responsive bg-white shadow-sm">
          <h2 className="p-3 pb-0">Participant Contacts</h2>
          <ParticipantOverview
            participantsRecords={dummyParticipantRecords}
            onParticipantRowClicked={(participantId: string) => {
              dummyParticipantRecords.map((element) => {
                if (element.participantID === participantId) {
                  setParticipantData(element);
                }
                return null;
              });
            }}
          />
        </div>
        <EmailNotifications />
        <Credits />
      </div>
      <ParticipantDetails
        participantDetails={participantData}
        onClose={() => setParticipantData(undefined)}
      />
    </div>
  );
};

export default Contacts;
