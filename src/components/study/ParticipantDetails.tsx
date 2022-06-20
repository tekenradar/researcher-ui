import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/css/components/study/ParticipantDetails.css";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";
import clsx from "clsx";

interface ParticipantDetailsProps {
  participantDetails?: {
    [key: string]: any;
  };
  onClose: () => void;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = (props) => {
  const { bgColor, color, borderClassName } = useStudyColorClassnames();


  const header = () => {
    return <div className={clsx(
      bgColor,
      color,
      borderClassName,
      "d-flex align-items-center border-bottom p-2"
    )}>
      <h5 className="m-0 flex-grow-1">Participant Details</h5>
      <button
        type="button"
        className={clsx("btn", color)}
        onClick={() => {
          props.onClose();
        }}
      >
        <FontAwesomeIcon className="fa-xl pl-5" icon={faClose} />
      </button>
    </div>
  }

  console.log(props.participantDetails)


  const body = () => {
    if (!props.participantDetails) {
      return <p key="select">Select a participant</p>
    }

    return <div
      className="p-2"
    >
      <div className="d-flex flex-wrap justify-content-between">
        {Object.entries(props.participantDetails).map(([key, value]) => {
          return <div key={key}
            className="my-2 mx-3"
          >
            <label className="fw-bold fs-6">{key}</label>
            <p>{value}</p>
          </div>
        })
        }
      </div>
      {/* --------- */}

    </div>
  }

  return (
    <div
      className={clsx(
        'bg-white border-start',
        borderClassName,
        {
          "open": props.participantDetails,
          "close": !props.participantDetails,
        }
      )}
      style={{ minWidth: "280px" }}
    >
      {header()}
      {body()}
    </div>
  );
};

export default ParticipantDetails;
