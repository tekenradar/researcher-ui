import React, { useState } from "react";
import Credits from "../../components/Credits";
import EmailNotifications from "../../components/study/contacts/EmailNotifications";
import ContactDetails from "../../components/study/contacts/ContactDetails";
import ContactTable from "../../components/study/contacts/ContactTable";


interface Note {
  time: number;
  author: string;
  content: string;
}

export interface ParticipantSessionData {
  addedAt: number;
  sessionID: string;
  participantID: string;
  general: { [key: string]: any };
  confidentialData?: { [key: string]: any };
  notes?: Note[];
}


const dummyParticipantRecords: ParticipantSessionData[] = [
  {
    addedAt: 1682238238,
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      Age: 34,
      sex: "M",
    },
  },
  {
    addedAt: 1652238238,
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
    <div className="d-flex w-100" style={{}}>
      <div className="table-responsive w-100 p-3">
        <div className="table-responsive flex-grow-1 p-3 bg-white shadow-sm">
          <h2 className="">Participant Contacts</h2>
          <ContactTable
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
      <ContactDetails
        participantDetails={participantData}
        onClose={() => setParticipantData(undefined)}
      />
    </div>
  );
};

export default Contacts;
