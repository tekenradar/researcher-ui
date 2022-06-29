import React from "react";
import { Table } from "react-bootstrap";
import { ParticipantSessionData } from "../../pages/study/ParticipantRecords";
import { shortenParticipantID } from "../../utils/shortenParticipantID";


interface ParticipantOverviewProps {
  onParticipantRowClicked: (participantId: string) => void;
  participantsRecords: Array<ParticipantSessionData>;
}


const ParticipantOverview: React.FC<ParticipantOverviewProps> = (props) => {

  const tableColumnName = () => {


    return (<React.Fragment>
      <th>Session ID</th>
      <th>Participant ID</th>
      {Object.keys(props.participantsRecords[0].general).map((item) => {
        return <th key={item} scope="col">{item}</th>;
      })}
    </React.Fragment>);
  };


  const tableRows = () => {
    return props.participantsRecords.map((item, index) => {
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
        <td>{item.sessionID}</td>
        <td>{shortenParticipantID(item.participantID)}</td>
        {Object.values(item.general).map((rowElement, index) => {
          return <td key={index}>{"" + rowElement}</td>;
        })}
      </React.Fragment>
    )
  };


  return (
    <div className="flex-grow-1 table-responsive">
      <Table responsive hover className="mx-3">
        <thead>
          <tr>{tableColumnName()}</tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </Table>
    </div>
  );
};

export default ParticipantOverview;
