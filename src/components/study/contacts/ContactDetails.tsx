import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { useStudyColorClassnames } from "../../../hooks/useStudyColorClassnames";
import clsx from "clsx";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ContactDetailsData } from "../../../pages/study/Contacts";
import { shortenParticipantID } from "../../../utils/shortenParticipantID";
import styles from './ContactDetails.module.css';
import Notes from "./Notes";
import { useState } from "react";
import { makeid } from "../../../utils/makeid";


interface ContactDetailsProps {
  contactDetails?: ContactDetailsData;
  onClose: () => void;
  onContactDetailsChanged: (contactDetails: ContactDetailsData) => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = (props) => {
  const { bgColor, color, borderClassName } = useStudyColorClassnames();

  const [loadingNotes, setLoadingNotes] = useState(false);

  const addNewNote = async (message: string) => {
    setLoadingNotes(true);
    // TODO:
    setTimeout(() => {
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
    }, 500)
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

          <div className="my-2 me-3">
            <label className="fs-small fw-bold">Age in PDiff</label>
            <p>{props.contactDetails.general.age}</p>
          </div>
          <div className="my-2 me-3">
            <label className="fs-small fw-bold">Gender in PDiff</label>
            <p>{props.contactDetails.general.age}</p>
          </div>
          <div className="my-2 me-3">
            <label className="fs-small fw-bold">Interested in other studies</label>
            <p>{props.contactDetails.general.otherStudies ? 'yes' : 'no'}</p>
          </div>

        </div>
        {/* --------- */}
        <hr></hr>
        <h5 className="fw-bold">Contact Infos</h5>
        <div className="alert alert-warning">
          <p className="fs-small">
            Unless explicitly marked here, contact infos will be deleted after 12 weeks automatically.
          </p>
          <p className="m-0 fs-small">
            If user manually deletes the contact data, it won't be available, even if marked here to keep data.
          </p>
        </div>
        <p className="text-muted">No contact info provided</p>
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
