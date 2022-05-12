import React from 'react';
import { Offcanvas } from 'react-bootstrap';

interface ParticipantDetailsProps {
  participantDetails: Object;
  show: boolean;
  onClose: () => void;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = (props) => {

 
const tableEachRow = () =>{
  return (Object.values(props.participantDetails).map((rowElement)=>{
    return (<p>{""+rowElement}</p>);
}));
};
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onClose}
      scroll={true}
      backdrop={false}
      placement='end'
      style={{
        width: '40%',
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Participant Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
       <div>
         {tableEachRow()}
       </div>
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default ParticipantDetails;
