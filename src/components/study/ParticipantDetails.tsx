import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import "../../stylesheets/css/components/study/ParticipantDetails.css";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";
import clsx from "clsx";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import LoadingButton from "../LoadingButton";
import Note from "./Note";
import { ParticipantSessionData } from "../../pages/study/ParticipantRecords";
import { shortenParticipantID } from "../../utils/shortenParticipantID";

interface ParticipantDetailsProps {
  participantDetails?: ParticipantSessionData;
  onClose: () => void;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = (props) => {
  const { bgColor, color, borderClassName } = useStudyColorClassnames();

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
    if (!props.participantDetails) {
      return <p key="select">Select a participant</p>;
    }

    return (
      <div className="p-3">
        <h5 className="fw-bold ">General</h5>
        <div>
          <label className="fs-small fw-bold">Session ID</label>
          <p>{props.participantDetails.sessionID}</p>
        </div>
        <div className="">
          <label className="fs-small fw-bold">Participant ID</label>
          <div className="d-flex align-items-center">
            <p className="m-0">{shortenParticipantID(props.participantDetails.participantID)}</p>
            <OverlayTrigger placement="left" overlay={<Tooltip>Copy participant ID</Tooltip>}>
              <button className="btn"
                onClick={() => {
                  if (props.participantDetails?.participantID) {
                    navigator.clipboard.writeText(props.participantDetails?.participantID)
                  }
                }}
              >
                <FontAwesomeIcon icon={faClone} />
              </button>
            </OverlayTrigger>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between">
          {Object.entries(props.participantDetails.general).map(([key, value]) => {
            return (
              <div key={key} className="my-2 me-3">
                <label className="fs-small fw-bold">{key}</label>
                <p>{value}</p>
              </div>
            );
          })}
        </div>
        {/* --------- */}
        <hr></hr>
        <h5 className="fw-bold">Contact Infos</h5>
        <p className="text-muted">No contact info provided</p>
        {/* --------- */}
        <hr></hr>
        <h5 className="fw-bold">Notes</h5>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>New note:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <LoadingButton
          className="btn btn-secondary"
          label="Add note"
        />
        <div className="py-3">
          <p className="fw-bold m-0">Previous notes:</p>
          {!props.participantDetails.notes || props.participantDetails.notes.length < 1 ?
            <p className="text-muted">No notes yet.</p>
            : null}
          {props.participantDetails.notes?.map((note, index) => {
            return <Note
              key={index.toString()}
              time={note.time}
              author={note.author}
              content={note.content}
            />
          })}

        </div>

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
          open: props.participantDetails,
          close: !props.participantDetails,
        })
      }
      style={{ minWidth: "380px", maxHeight: '100%' }}
    >
      {header()}
      {body()}
    </div>
  );
};

export default ParticipantDetails;
