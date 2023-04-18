import ContactDownloader from '@/components/substudy/contacts/ContactDownloader';
import React from 'react';
import ContactTable from './ContactTable';
import { getContactDetailsData } from './utils';

interface ContactOverviewCardProps {
  substudyID: string;
}

async function ContactOverviewCard(props: ContactOverviewCardProps) {
  const contactDetails = await getContactDetailsData(props.substudyID);


  return (
    <div className="table-responsive flex-grow-1 p-3 bg-white rounded shadow-sm">
      <h2 className="">Participant Contacts</h2>
      <ContactTable
        contactDetailsList={contactDetails.participantContacts}
        substudyID={props.substudyID}
      />
      <ContactDownloader
        substudyID={props.substudyID}
      />
    </div>
  );
};

export default ContactOverviewCard;
