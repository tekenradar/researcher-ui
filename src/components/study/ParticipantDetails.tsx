import React from 'react';
import { Offcanvas } from 'react-bootstrap';

interface ParticipantDetailsProps {
  show: boolean;
  onClose: () => void;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = (props) => {
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
        TODO
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default ParticipantDetails;
