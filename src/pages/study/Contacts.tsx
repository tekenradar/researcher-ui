import React, { useEffect, useState } from "react";
import Credits from "../../components/Credits";
import EmailNotifications from "../../components/study/contacts/EmailNotifications";
import ContactDetails from "../../components/study/contacts/ContactDetails";
import ContactTable from "../../components/study/contacts/ContactTable";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";


interface Note {
  id: string;
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


const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";


const Contacts: React.FC = () => {
  const { studyInfo, isLoading } = useAppContext();
  let navigate = useNavigate();

  const [contactDetailsList, setContactDetailsList] = useState<ContactDetailsData[]>([])
  const [selectedContactDetails, setSelectedContactDetails] = useState<ContactDetailsData>();
  const [loadingContactDetails, setLoadingContactDetails] = useState(false);

  useEffect(() => {
    if (!studyInfo) {
      return;
    }
    if (!studyInfo.features.contacts) {
      navigate('../unavailable', { replace: true })
    }
    if (!isLoading && !loadingContactDetails) {
      fetchContactDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, studyInfo, isLoading])

  useEffect(() => {
    setSelectedContactDetails(undefined);
  }, [])

  useEffect(() => {
    if (selectedContactDetails) {
      setSelectedContactDetails(contactDetailsList.find(item => item.id === selectedContactDetails.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactDetailsList])

  const fetchContactDetails = async () => {
    try {
      setLoadingContactDetails(true);
      const url = new URL(`${apiRoot}/v1/study/${studyInfo?.key}/participant-contacts`);

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setContactDetailsList(data.participantContacts);
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingContactDetails(false);
    }
  }

  const changeContactKeepAttribute = async (contactId: string, keep: boolean) => {
    try {
      setLoadingContactDetails(true);
      const url = new URL(`${apiRoot}/v1/study/${studyInfo?.key}/participant-contacts/${contactId}/keep`);
      url.search = new URLSearchParams({ value: keep.toString() }).toString();

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setContactDetailsList(data.participantContacts);
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingContactDetails(false);
    }

  }

  return (
    <div className="d-flex flex-grow-1" style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <div className="table-responsive flex-grow-1 p-3">
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
        onChangePermanentStatus={(details, keep) => {
          changeContactKeepAttribute(details.id, keep)
        }}
        onAddNote={(details, note) => {

        }}
      /*onContactDetailsChanged={(details) => {
        const index = contactDetailsList.findIndex(cd => cd.id === details.id);
        setSelectedContactDetails({ ...details })
        if (index > -1) {
          setContactDetailsList(prev => {
            prev[index] = details;
            return [...prev];
          })
        }
      }}*/
      />
    </div>
  );
};

export default Contacts;
