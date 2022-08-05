import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { useStudyColorClassnames } from "../../../hooks/useStudyColorClassnames";
import clsx from "clsx";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ContactDetailsData } from "../../../pages/study/Contacts";
import { shortenParticipantID } from "../../../utils/shortenParticipantID";
import styles from './ContactDetails.module.css';
import Notes, { Note } from "./Notes";
import { useState } from "react";
import { makeid } from "../../../utils/makeid";
import { fromUnixTime, format } from "date-fns";



interface ContactDetailsProps {
  contactDetails?: ContactDetailsData;
  onClose: () => void;
  onChangePermanentStatus: (contactDetails: ContactDetailsData, keep: boolean) => void;
  onAddNote: (contactDetails: ContactDetailsData, note: Note) => void;
}

const showValueOrDashIfMissing = (value?: string | number): string => {
  if (!value || value.toString().length < 1) {
    return '-'
  }
  return value.toString();
}

const ContactDetails: React.FC<ContactDetailsProps> = (props) => {
  const { bgColor, color, borderClassName } = useStudyColorClassnames();

  const [loadingNotes, setLoadingNotes] = useState(false);

  const addNewNote = async (message: string) => {
    setLoadingNotes(true);
    // TODO:
    /*setTimeout(() => {
      if (props.contactDetails !== undefined) {
        const notes = [
          {
            id: makeid(10),
            time: (new Date()).getTime(),
            author: 'test@email.nl',
            content: message,
          }
        ]
        if (props.contactDetails.notes) {
          notes.push(...props.contactDetails.notes)
        }

        const newContactDetails: ContactDetailsData = {
          ...props.contactDetails,
          notes: notes
        }
        props.onContactDetailsChanged(newContactDetails)
        setLoadingNotes(false)
      }
    }, 500)*/
  }




  const header = () => {
    return (
      <div
        className={clsx(
          bgColor,
          color,
          borderClassName,
          "d-flex align-items-center border-bottom p-2"
        )}
      >
        <h4 className="m-0 flex-grow-1 h5">Session Details</h4>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Close Details</Tooltip>}
        >
          <button
            type="button"
            className={clsx("btn", color)}
            onClick={() => {
              props.onClose();
            }}
          >
            <FontAwesomeIcon className="fa-xl pl-5" icon={faClose} />
          </button>
        </OverlayTrigger>
      </div>
    );
  };

  const body = () => {
    if (!props.contactDetails) {
      return <p key="select">Select a participant</p>;
    }

    return (
      <div className="p-3">
        <Form.Check
          type="switch"
          className="mb-2"
          id="permanentData"

          checked={props.contactDetails.keepContactData}
          label={props.contactDetails.keepContactData ? "Permanent entry" : "Non-Permanent entry"}
          onChange={(event) => {
            if (!props.contactDetails) { return }
            const checked = event.target.checked;
            if (window.confirm(
              checked ? 'Are you sure you are authorized to mark this entry as "permanent"?' :
                'Are you sure, you want to mark this entry as "non-permanent", so it will be auto-deleted after 12 weeks?'
            )) {
              props.onChangePermanentStatus(props.contactDetails, checked);
            }
          }}
        />
        {props.contactDetails.keepContactData ? null : <div className="alert alert-warning">
          <p className="fs-small mb-0">
            Unless explicitly marked here, contact infos will be deleted after 12 weeks automatically.
          </p>
        </div>}

        <h5 className="fw-bold ">General</h5>
        <div>
          <label className="fs-small fw-bold">Session ID</label>
          <p>{props.contactDetails.sessionID}</p>
        </div>
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
        {/* --------- */}
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



        {/* --------- */}
        <hr></hr>
        <Notes
          contactNotes={props.contactDetails.notes}
          onAddContactNote={addNewNote}
          isLoading={loadingNotes}
        />

      </div>
    );
  };

  return (
    <div
      className={clsx(
        "bg-white border-start",
        "d-flex flex-column overflow-scroll",
        borderClassName,
        {
          [styles.open]: props.contactDetails,
          [styles.close]: !props.contactDetails,
        })
      }
      style={{ minWidth: "380px", maxHeight: '100%' }}
    >
      {header()}
      {body()}
    </div>
  );
};

export default ContactDetails;
