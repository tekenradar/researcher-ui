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
        <h5 className="m-0 flex-grow-1">Participant Details</h5>
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
      <div className="p-2">
        <h6>General</h6>
        <div className="d-flex flex-wrap justify-content-between">
          {Object.entries(props.participantDetails).map(([key, value]) => {
            return (
              <div key={key} className="my-2 me-3">
                <label className="fw-bold fs-6">{key}</label>
                <p>{value}</p>
              </div>
            );
          })}
        </div>
        {/* --------- */}
        <hr></hr>
        <h6>Contact Infos</h6>

        {/* --------- */}
        <hr></hr>
        <h6>Notes</h6>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <LoadingButton
          className="btn btn-secondary"
          label="Add note"
        />
        <Note
          time={15456465}
          author='email-2@todo.tld'
          content={`Hi \n\n how are you`}
        />
      </div>
    );
  };

  return (
    <div
      className={clsx("bg-white border-start", borderClassName, {
        open: props.participantDetails,
        close: !props.participantDetails,
      })}
      style={{ minWidth: "280px" }}
    >
      {header()}
      {body()}
    </div>
  );
};

export default ParticipantDetails;
