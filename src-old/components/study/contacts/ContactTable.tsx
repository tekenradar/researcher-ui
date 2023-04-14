import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { format, fromUnixTime } from "date-fns";
import React, { useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { ContactDetailsData } from "../../../pages/study/Contacts";
import { shortenParticipantID } from "../../../../components/utils/shortenParticipantID";


interface ContactTableProps {
  isLoading: boolean;
  selectedContactDetails?: ContactDetailsData;
  onParticipantRowClicked: (participantId: string) => void;
  contactDetailsList: Array<ContactDetailsData>;
}

const compactViewItemLimit = 9;

const ContactTable: React.FC<ContactTableProps> = (props) => {
  const [showAll, setShowAll] = useState(false);

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


  const tableRows = () => {
    return props.contactDetailsList.map((item, index) => {
      if (!showAll && index >= compactViewItemLimit) {
        return null
      }
      return (
        <tr
          key={index.toFixed()}
          className={clsx({
            "fw-bold": props.selectedContactDetails?.id === item.id
          })}
          onClick={() => {
            props.onParticipantRowClicked(item.id as string);
          }}
        >
          {tableEachRow(item)}
        </tr>
      );
    });
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


  if (props.isLoading) {
    return <div className='py-3 text-center'>
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
    </div>
  }

  if (props.contactDetailsList.length < 1) {
    return <div className='py-3 text-center'>
      <p>No contact infos found in this substudy yet. Check back later or refresh the page.</p>
    </div>
  }


  return (
    <React.Fragment>
      <Table
        bordered
        striped
        responsive
        hover
      >
        <thead>
          <tr>{tableColumnName()}</tr>
        </thead>
        <tbody>
          {tableRows()}
        </tbody>

      </Table>
      {props.contactDetailsList.length > compactViewItemLimit ? <div className="text-center mb-3">
        <Button
          variant="outline-secondary"
          onClick={() => {
            setShowAll(prev => !prev)
          }}
        >
          <div className="d-flex alignt-items-center ">
            {showAll ?
              <span>Show only recent entries <FontAwesomeIcon icon={faChevronUp} /></span>
              : <span>Show all ({props.contactDetailsList.length}) entries <FontAwesomeIcon icon={faChevronDown} /></span>}
          </div>
        </Button>
      </div> : null}
    </React.Fragment >
  );
};

export default ContactTable;
