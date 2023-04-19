'use client';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import ContactViewer from './ContactViewer';
import { ContactDetailsData } from '../contacts/types';

interface ContactViewerModalProps {
  contactDetails: ContactDetailsData;
  params: {
    substudyID: string;
    contactID: string;
  };
}

const ContactViewerModal: React.FC<ContactViewerModalProps> = (props) => {
  const router = useRouter();

  return (
    <Modal
      show={true}
      onHide={() => {
        router.back();
      }}
    >
      <div className='p-3'>
        <ContactViewer
          params={props.params}
          contactDetails={props.contactDetails}
        />
      </div>
    </Modal>
  );
};

export default ContactViewerModal;
