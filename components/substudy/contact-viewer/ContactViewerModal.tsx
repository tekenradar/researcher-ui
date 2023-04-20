'use client';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
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
  const pathname = usePathname();

  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setShow(pathname.includes('contact-viewer'));
  }, [pathname]);


  return (
    <Modal
      show={show}
      size='lg'
      onHide={() => {
        router.replace(`/substudies/${props.params.substudyID}/contacts`);
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
