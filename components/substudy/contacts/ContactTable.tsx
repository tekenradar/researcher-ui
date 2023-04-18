'use client';

import React, { useState, useTransition } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ContactDetailsData } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { format, fromUnixTime } from 'date-fns';
import { shortenParticipantID } from '@/utils/shortenParticipantID';
import { useRouter } from 'next/navigation';

interface ContactTableProps {
  substudyID: string;
  contactDetailsList: Array<ContactDetailsData>;
}

const compactViewItemLimit = 9;

const ContactTable: React.FC<ContactTableProps> = (props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [showAll, setShowAll] = useState(false);

  if (!props.contactDetailsList || props.contactDetailsList.length === 0) {
    return <div className='alert alert-info'>
      No contacts found
    </div>;
  };

  const tableColumnName = () => {
    return (<React.Fragment>
      <th>Added on</th>
      <th>Session ID</th>
      <th>Participant ID</th>
      {Object.keys(props.contactDetailsList[0].general).map((item) => {
        return <th key={item} scope="col">{item}</th>;
      })}
      <th>Contact</th>
    </React.Fragment>);
  };

  const tableEachRow = (item: any) => {
    return (
      <React.Fragment>
        <td>{format(fromUnixTime(item.addedAt), 'dd-MM-yyyy')}</td>
        <td>{item.sessionID}</td>
        <td>{shortenParticipantID(item.participantID)}</td>
        {Object.values(item.general).map((rowElement, index) => {
          return <td key={index}>{"" + rowElement}</td>;
        })}
        <td>{
          item.keepContactData ? 'Permanent' : (item.contactData !== null ? 'Available' : 'Empty')
        }
        </td>
      </React.Fragment>
    )
  };

  const tableRows = () => {
    return props.contactDetailsList.map((item, index) => {
      if (!showAll && index >= compactViewItemLimit) {
        return null
      }
      return (
        <tr
          key={index.toFixed()}
          className='cursor-pointer'
          onClick={() => {
            startTransition(() => {
              router.push(`/substudies/${props.substudyID}/contact-viewer/${item.id}`);
            });
          }}
        >
          {tableEachRow(item)}
        </tr>
      );
    });
  };

  return (
    <>
      <Table
        bordered
        striped
        responsive
        hover
        style={{
          opacity: isPending ? 0.5 : 1,
        }}
      >
        <thead>
          <tr>{
            tableColumnName()
          }</tr>
        </thead>
        <tbody>
          {
            tableRows()
          }
        </tbody>

      </Table>
      {
        props.contactDetailsList.length > compactViewItemLimit ? <div className="text-center mb-3">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowAll(prev => !prev)
            }}
          >
            <div className="d-flex alignt-items-center ">
              {showAll ?
                <span>Show only recent entries <FontAwesomeIcon icon={faChevronUp} height={16} /></span>
                : <span>Show all ({props.contactDetailsList.length}) entries <FontAwesomeIcon icon={faChevronDown} height={16} /></span>}
            </div>
          </Button>
        </div> : null
      }
    </>
  );
};

export default ContactTable;
