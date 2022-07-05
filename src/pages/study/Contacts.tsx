import React, { useEffect, useState } from "react";
import Credits from "../../components/Credits";
import EmailNotifications from "../../components/study/contacts/EmailNotifications";
import ContactDetails from "../../components/study/contacts/ContactDetails";
import ContactTable from "../../components/study/contacts/ContactTable";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";


interface Note {
  time: number;
  author: string;
  content: string;
}

export interface ContactDetailsData {
  id: string;
  addedAt: number;
  sessionID: string;
  participantID: string;
  general: {
    age: number;
    gender: string;
    otherStudies: boolean;
  };
  contactData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthday?: number;
    gender?: string;
    gp?: {
      office: string;
      name: string;
      address: {
        street: string;
        nr: string;
        postcode: string;
        city: string;
      }
      phone: string;
    }
  };
  keepContactData: boolean;
  notes?: Note[];
}


const dummyParticipantRecords: ContactDetailsData[] = [
  {
    id: "1",
    addedAt: 1682238238,
    sessionID: '621394a1a0919b92',
    participantID: 'f878a37068309bb9c8746390d9a30216981dbf1bace1923999ff18cfa1ed5cb4',
    general: {
      age: 34,
      gender: "male",
      otherStudies: true
    },
    keepContactData: false
  },
  {
    id: "2",
    addedAt: 1652238238,
    sessionID: '621394a1a0919b93',
    participantID: 'a3b960c17ea4de7d4e267c754dbbe9eaeba54bf5a1da8d5d90b59bcd0cfef1a6',
    general: {
      age: 26,
      gender: "other",
      otherStudies: true,
    },
    keepContactData: true,
    contactData: {
      firstName: 'First',
      lastName: 'Last',
      email: 'test@test.de',

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
  {
    id: "3",
    addedAt: 1642238238,
    sessionID: '621394a1a0919b90',
    participantID: 'bcaes960c17ea4de7d4e267c754dbbe9eaeba54bf5a1da8d5d90b59bcd0cf98545',
    general: {
      age: 14,
      gender: "female",
      otherStudies: false,
    },
    keepContactData: true,
    contactData: {
      firstName: 'Firstname',
      lastName: 'Lastname',
      email: 'test@test.de',

    },
    notes: [

    ]
  },
];


const Contacts: React.FC = () => {
  const { studyInfo } = useAppContext();
  let navigate = useNavigate();

  const [contactDetailsList, setContactDetailsList] = useState<ContactDetailsData[]>([])
  const [selectedContactDetails, setSelectedContactDetails] = useState<ContactDetailsData>();
  const [loadingContactDetails, setLoadingContactDetails] = useState(true);

  useEffect(() => {
    if (studyInfo !== undefined && !studyInfo.features.contacts) {
      navigate('../unavailable', { replace: true })
    }
  }, [navigate, studyInfo])

  useEffect(() => {
    setSelectedContactDetails(undefined);
    fetchContactDetails();
  }, [])

  const fetchContactDetails = async () => {
    setLoadingContactDetails(true);
    // TODO
    setTimeout(() => {
      setContactDetailsList(dummyParticipantRecords);
      setLoadingContactDetails(false);
    }, 1200)
  }

  return (
    <div className="d-flex w-100" style={{}}>
      <div className="table-responsive w-100 p-3">
        <div className="table-responsive flex-grow-1 p-3 bg-white shadow-sm">
          <h2 className="">Participant Contacts</h2>
          <ContactTable
            isLoading={loadingContactDetails}
            contactDetailsList={contactDetailsList}
            selectedContactDetails={selectedContactDetails}
            onParticipantRowClicked={(participantId: string) => {
              contactDetailsList.map((element) => {
                if (element.participantID === participantId) {
                  setSelectedContactDetails(element);
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
        contactDetails={selectedContactDetails}
        onClose={() => setSelectedContactDetails(undefined)}
        onContactDetailsChanged={(details) => {
          const index = contactDetailsList.findIndex(cd => cd.id === details.id);
          setSelectedContactDetails({ ...details })
          if (index > -1) {
            setContactDetailsList(prev => {
              prev[index] = details;
              return [...prev];
            })
          }
        }}
      />
    </div>
  );
};

export default Contacts;
