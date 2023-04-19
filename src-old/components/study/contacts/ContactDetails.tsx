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

const showValueOrDashIfMissing = (value?: string | number): string => {
  if (!value || value.toString().length < 1) {
    return '-'
  }
  return value.toString();
}

const ContactDetails: React.FC<ContactDetailsProps> = (props) => {

  /*const body = () => {
    if (!props.contactDetails) {
      return <p key="select">Select a participant</p>;
    }

    return (
      <div className="p-3">
        <div className="">
          <label className="fs-small fw-bold">Participant ID</label>
          <div className="d-flex align-items-center">
            <p className="m-0">{shortenParticipantID(props.contactDetails.participantID)}</p>
            <OverlayTrigger placement="left" overlay={<Tooltip>Copy participant ID</Tooltip>}>
              <button className="btn"
                onClick={() => {
                  if (props.contactDetails?.participantID) {
                    navigator.clipboard.writeText(props.contactDetails?.participantID)
                  }
                }}
              >
                <FontAwesomeIcon icon={faClone} />
              </button>
            </OverlayTrigger>
          </div>
        </div>


        <div className="d-flex flex-wrap justify-content-between">
          <div className="mt-2 me-3">
            <label className="fs-small fw-bold">Age from PDiff</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.general.age)}</p>
          </div>
          <div className="mt-2 me-3">
            <label className="fs-small fw-bold">Gender from PDiff</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.general.gender)}</p>
          </div>
          <div className="mt-2 me-3">
            <label className="fs-small fw-bold">Interested in other studies</label>
            <p className="mb-0">{props.contactDetails.general.otherStudies ? 'yes' : 'no'}</p>
          </div>

        </div>

        <hr></hr>
        <h5 className="fw-bold">Contact Infos</h5>
        <div className="mb-2">
          <label className="fs-small fw-bold">Email</label>
          <a className="mb-0 d-block" href={"mailto:" + showValueOrDashIfMissing(props.contactDetails.contactData?.email)}>{showValueOrDashIfMissing(props.contactDetails.contactData?.email)}</a>
        </div>

        <div className="mb-2">
          <label className="fs-small fw-bold">Phone</label>
          <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.phone)}</p>
        </div>

        <div className="d-flex  flex-wrap justify-content-start">
          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">First name</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.firstName)}</p>
          </div>

          <div className="mb-2">
            <label className="fs-small fw-bold">Last name</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.lastName)}</p>
          </div>
        </div>

        <div className="mb-2">
          <label className="fs-small fw-bold">Birthday</label>
          {props.contactDetails.contactData?.birthday ?
            <p className="mb-0">{format(fromUnixTime(props.contactDetails.contactData?.birthday), 'dd-MM-yyyy')}</p>
            : <p>-</p>}
        </div>

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
