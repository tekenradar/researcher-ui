import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import styles from './ContactDetails.module.css';
import Notes, { Note } from "./Notes";
import { makeid } from "../../../../utils/makeid";
import { fromUnixTime, format, getUnixTime } from "date-fns";
import LoadingButton from "../../../../components/LoadingButton";



interface ContactDetailsProps {
  isLoading: boolean;

  onClose: () => void;
}



const ContactDetails: React.FC<ContactDetailsProps> = (props) => {

  /*const body = () => {
    if (!props.contactDetails) {
      return <p key="select">Select a participant</p>;
    }

    return (
      <div className="p-3">







        {props.contactDetails.contactData?.gp ?
          <div className="d-flex  flex-wrap justify-content-between">
            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">GP</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.office)}</p>
            </div>

            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">Doctor</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.name)}</p>
            </div>

            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">Street</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.street)}</p>
            </div>
            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">Nr.</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.nr)}</p>
            </div>
            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">Postcode</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.postcode)}</p>
            </div>
            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">City</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.city)}</p>
            </div>
            <div className="mb-2 me-2">
              <label className="fs-small fw-bold">GP Phone</label>
              <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.phone)}</p>
            </div>
          </div>
          : <p className="text-muted">No GP data</p>}




        <hr></hr>
        <Notes
          contactNotes={props.contactDetails.notes}
          onAddContactNote={(message) => {
            if (!props.contactDetails || !authContext.userID) {
              return;
            }
            props.onAddNote(props.contactDetails, {
              id: makeid(10),
              author: authContext.userID,
              content: message,
              time: getUnixTime(new Date()),
            })
          }}
          isLoading={props.isLoading}
        />


      </div>
    );
  };*/

  return (
    <div


      style={{ minWidth: "380px", maxHeight: '100%' }}
    >

    </div>
  );
};

export default ContactDetails;
