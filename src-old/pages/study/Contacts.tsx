import React, { useEffect, useState } from "react";
import ContactDetails from "../../components/study/contacts/ContactDetails";


const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";

const contactTopic = "contact";

const Contacts: React.FC = () => {
  /*
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
    if (!isLoading && !loadingNotificationSubs) {
      fetchNotificationSubs();
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
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/participant-contacts`);

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
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/participant-contacts/${contactId}/keep`);
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

  const addNoteToParticipantContact = async (contactId: string, note: Note) => {
    try {
      setLoadingContactDetails(true);
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/participant-contacts/${contactId}/note`);

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        method: 'POST',
        body: JSON.stringify(note),
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

  const deleteParticipantContact = async (contactId: string) => {
    try {
      setLoadingContactDetails(true);
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/participant-contacts/${contactId}`);

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        method: 'DELETE',
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


*/


  return (
    <div className="d-flex flex-grow-1" style={{ overflowX: 'auto', maxWidth: '100%' }}>
      {/*
      <ContactDetails
        isLoading={loadingContactDetails}
        contactDetails={selectedContactDetails}
        onClose={() => setSelectedContactDetails(undefined)}
        onChangePermanentStatus={(details, keep) => {
          changeContactKeepAttribute(details.id, keep)
        }}
        onAddNote={(details, note) => {
          addNoteToParticipantContact(details.id, note)
        }}
        onDeleteContact={(details) => {
          deleteParticipantContact(details.id);
        }}
      />*/}
    </div>
  );
};

export default Contacts;
