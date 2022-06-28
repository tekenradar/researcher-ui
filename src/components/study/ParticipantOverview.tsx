import React from "react";
import { Table } from "react-bootstrap";

interface ParticipantOverviewProps {
  onParticipantRowClicked: (participantId: string) => void;
  participantsRecords: Array<any>;
}

const ParticipantOverview: React.FC<ParticipantOverviewProps> = (props) => {
  const tableColumnName = () => {
    return Object.keys(props.participantsRecords[0]).map((item) => {
      return <th scope="col">{item}</th>;
    });
  };
  const tableRows = () => {
    return props.participantsRecords.map((item) => {
      return (
        <tr
          onClick={() => {
            props.onParticipantRowClicked(item.participantId as string);
          }}
        >
          {tableEachRow(item)}
        </tr>
      );
    });
  };
  const tableEachRow = (item: any) => {
    return Object.values(item).map((rowElement) => {
      return <td>{"" + rowElement}</td>;
    });
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
