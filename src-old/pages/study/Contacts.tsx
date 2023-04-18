import React, { useEffect, useState } from "react";
import Credits from "../../../components/Credits";
import EmailNotifications, { NotificationSub } from "../../components/study/contacts/EmailNotifications";
import ContactDetails from "../../components/study/contacts/ContactDetails";
import ContactTable from "../../components/study/contacts/ContactTable";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from 'file-saver';
import { format } from "date-fns";



const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";

const contactTopic = "contact";

const Contacts: React.FC = () => {
  const { studyInfo, isLoading } = useAppContext();
  let navigate = useNavigate();

  const [contactDetailsList, setContactDetailsList] = useState<ContactDetailsData[]>([])
  const [selectedContactDetails, setSelectedContactDetails] = useState<ContactDetailsData>();
  const [loadingContactDetails, setLoadingContactDetails] = useState(false);

  const [loadingNotificationSubs, setLoadingNotificationSubs] = useState(false);
  const [notificationSubs, setNotificationSubs] = useState<NotificationSub[]>([])

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

  const fetchNotificationSubs = async () => {
    try {
      setLoadingNotificationSubs(true);
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/notifications`);
      url.search = new URLSearchParams({ topic: contactTopic }).toString();

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
      setNotificationSubs(data.emailNotifications);
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingNotificationSubs(false);
    }
  }

  const addNotificationSub = async (sub: NotificationSub) => {
    try {
      setLoadingNotificationSubs(true);
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/notifications`);

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        method: 'POST',
        body: JSON.stringify(sub),
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setNotificationSubs(data.emailNotifications);
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingNotificationSubs(false);
    }
  }

  const deleteNotificationSub = async (id: string) => {
    try {
      setLoadingNotificationSubs(true);
      const url = new URL(`${apiRoot}/v1/substudy/${studyInfo?.key}/notifications/${id}`);

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
      fetchNotificationSubs()
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoadingNotificationSubs(false);
    }
  }




  return (
    <div className="d-flex flex-grow-1" style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <div className="table-responsive flex-grow-1 p-3">
        <div className="table-responsive flex-grow-1 p-3 bg-white rounded shadow-sm">

        </div>
        <EmailNotifications
          isLoading={loadingNotificationSubs}
          notificationSubs={notificationSubs}
          onAddNewSub={(email) => {
            const sub: NotificationSub = {
              id: '',
              topic: contactTopic,
              email: email,
            }
            addNotificationSub(sub);
          }}
          onDeleteSub={(id: string) => {
            deleteNotificationSub(id);
          }}
        />
        <Credits />
      </div>
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
      />
    </div>
  );
};

export default Contacts;
