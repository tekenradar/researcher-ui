import React from "react";

interface ParticipantOverviewProps {
  onParticipantRowClicked: (participantId: number) => void;
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
            props.onParticipantRowClicked(item.participantId as number);
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
    <table className="table table-striped table-hover">
      <thead>
        <tr>{tableColumnName()}</tr>
      </thead>
      <tbody>{tableRows()}</tbody>
    </table>
  );
};

export default ParticipantOverview;
