'use client';

import { ContactDetailsData } from '@/components/substudy/contacts/types';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import saveAs from 'file-saver';
import React from 'react';
import { Spinner } from 'react-bootstrap';

interface ContactDownloaderProps {
  substudyID: string;
}

const toCSVentry = (value?: string): string => {
  if (value === undefined) {
    return '""';
  }
  return `"${value.replace(/"/g, '""')}"`;
}


const saveContactDataTableAsFile = (substudyID: string, contactDetailsList: ContactDetailsData[]) => {
  const filename = `${substudyID}_participant_contacts_${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.csv`;
  var content = '';
  const sep = ',';
  const lineEnd = '\r\n';

  // header:
  const header = [
    '"Contact ID"',
    '"Added at"',
    '"Session ID"',
    '"Participant ID"',
    '"Keep"',

    '"Age Flag"',
    '"Gender Flag"',
    '"Interested in other studies"',

    '"First name"',
    '"Last name"',
    '"Email"',
    '"Phone"',
    '"Birthday"',
    '"Gender"',

    '"GP_Office"',
    '"GP_Name"',
    '"GP_Phone"',
    '"GP_Street"',
    '"GP_Nr"',
    '"GP_Postcode"',
    '"GP_City"',

    '"Notes"'
  ];
  content += header.join(sep) + lineEnd;

  // rows:
  contactDetailsList.forEach(details => {
    const row = [
      `"${details.id}"`,
      `"${details.addedAt}"`,
      `"${details.sessionID}"`,
      `"${details.participantID}"`,
      `"${details.keepContactData}"`,

      `"${details.general.age}"`,
      `"${details.general.gender}"`,
      `"${details.general.otherStudies}"`,

      toCSVentry(details.contactData?.firstName),
      toCSVentry(details.contactData?.lastName),
      toCSVentry(details.contactData?.email),
      toCSVentry(details.contactData?.phone),
      `"${details.contactData?.birthday}"`,
      toCSVentry(details.contactData?.gender),

      toCSVentry(details.contactData?.gp?.office),
      toCSVentry(details.contactData?.gp?.name),
      toCSVentry(details.contactData?.gp?.phone),
      toCSVentry(details.contactData?.gp?.address.street),
      toCSVentry(details.contactData?.gp?.address.nr),
      toCSVentry(details.contactData?.gp?.address.postcode),
      toCSVentry(details.contactData?.gp?.address.city),

      `"${JSON.stringify(details.notes).replace(/"/g, '""')}"`,
    ]
    content += row.join(sep) + lineEnd;
  })


  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}

const ContactDownloader: React.FC<ContactDownloaderProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const downloadData = async () => {
    setErrorMsg('')

    try {
      setIsLoading(true);

      const baseURL = `${window.location.protocol}//${window.location.host}`;
      const url = new URL(`/api/substudy/${props.substudyID}/participant-contacts`, baseURL);

      const response = await fetch(url.toString());
      if (!response.ok) {
        const err = await response.json()
        console.log(err)
        throw new Error(err.error);
      }

      const data = await response.json();
      console.log(data)
      const participantContacts = data.participantContacts;
      saveContactDataTableAsFile(props.substudyID, participantContacts);
    } catch (err: any) {
      setErrorMsg(err.toString());
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="text-start">
      <button
        className="btn btn-outline-secondary"
        onClick={downloadData}
        disabled={isLoading}
      >
        <FontAwesomeIcon icon={faSave} height={16} /> Save to disk
        {isLoading &&
          <Spinner
            className='ms-2'
            size='sm'
          />
        }
      </button>
      {errorMsg &&
        <div className="text-danger mt-2">
          {errorMsg}
        </div>
      }
    </div>

  );
};

export default ContactDownloader;

