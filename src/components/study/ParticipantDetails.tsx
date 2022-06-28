import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/css/components/study/ParticipantDetails.css";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";
import clsx from "clsx";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import LoadingButton from "../LoadingButton";
import Note from "./Note";

interface ParticipantDetailsProps {
  participantDetails?: {
    [key: string]: any;
  };
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
        <h4 className="m-0 flex-grow-1 h5">Participant Details</h4>
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
        <div className="d-flex flex-wrap justify-content-between">
          {Object.entries(props.participantDetails).map(([key, value]) => {
            return (
              <div key={key} className="my-2 me-3">
                <label className="fw-bold fs-small">{key}</label>
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
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
          <Note
            time={1665456465}
            author='email-2@todo.tld'
            content={`Hi \n\n how are you`}
          />
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
      style={{ minWidth: "280px", maxHeight: '100%' }}
    >
      {header()}
      {body()}
    </div>
  );
};

export default ParticipantDetails;
