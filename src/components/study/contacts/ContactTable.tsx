import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, fromUnixTime } from "date-fns";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ParticipantSessionData } from "../../../pages/study/Contacts";
import { shortenParticipantID } from "../../../utils/shortenParticipantID";


interface ContactTableProps {
  onParticipantRowClicked: (participantId: string) => void;
  participantsRecords: Array<ParticipantSessionData>;
}

const compactViewItemLimit = 9;

const ContactTable: React.FC<ContactTableProps> = (props) => {
  const [showAll, setShowAll] = useState(false);

  const tableColumnName = () => {
    return (<React.Fragment>
      <th>Added on</th>
      <th>Session ID</th>
      <th>Participant ID</th>
      {Object.keys(props.participantsRecords[0].general).map((item) => {
        return <th key={item} scope="col">{item}</th>;
      })}
    </React.Fragment>);
  };


  const tableRows = () => {
    return props.participantsRecords.map((item, index) => {
      if (!showAll && index >= compactViewItemLimit) {
        return null
      }
      return (
        <tr
          key={index.toFixed()}
          onClick={() => {
            props.onParticipantRowClicked(item.participantID as string);
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
      </React.Fragment>
    )
  };


  return (
    <React.Fragment>
      <Table
        responsive hover size="sm" >
        <thead>
          <tr>{tableColumnName()}</tr>
        </thead>
        <tbody>
          {tableRows()}
        </tbody>

      </Table>
      {props.participantsRecords.length > compactViewItemLimit ? <div className="text-center mb-3">
        <Button
          variant="outline-secondary"
          onClick={() => {
            setShowAll(prev => !prev)
          }}
        >
          <div className="d-flex alignt-items-center ">
            {showAll ?
              <span>Show only recent entries <FontAwesomeIcon icon={faChevronUp} /></span>
              : <span>Show all ({props.participantsRecords.length}) entries <FontAwesomeIcon icon={faChevronDown} /></span>}
          </div>
        </Button>
      </div> : null}
    </React.Fragment >
  );
};

export default ContactTable;
