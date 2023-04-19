'use client';

import React from 'react';
import { ContactDetailsData } from '../contacts/types';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface ContactViewerProps {
  params: {
    substudyID: string;
    contactID: string;
  };
  contactDetails: ContactDetailsData;
}

const ContactViewer: React.FC<ContactViewerProps> = (props) => {
  return (
    <div>
      <div className='d-flex'>
        <h2 className="m-0 flex-grow-1">Session Details</h2>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Close Details</Tooltip>}
        >
          <Link
            className='btn btn-outline-secondary'
            href={`/substudies/${props.params.substudyID}/contacts`}>
            <FontAwesomeIcon className="fa-xl pl-5" height={24} icon={faClose} />
          </Link>

        </OverlayTrigger>
      </div>

      <p>ContactViewer</p>
    </div>
  );
};

export default ContactViewer;
