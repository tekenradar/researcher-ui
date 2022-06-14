import { useParams } from "react-router";
import { AppConstants } from "../../AppConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/css/components/study/ParticipantDetails.css";

interface ParticipantDetailsProps {
  participantDetails: Object;
  show: boolean;
  onClose: () => void;
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = (props) => {
  let { studykey } = useParams();
  const tableEachRow = () => {
    return Object.values(props.participantDetails).map((rowElement) => {
      return <p>{"" + rowElement}</p>;
    });
  };
  return (
    <div
      className={`flex-shrink-1 ${props.show ? "open" : "close"}`}
    // style={{ width: "400px" }}
    >
      <div className={`${AppConstants.getStudyTheme("" + studykey)}`}>
        <button
          type="button"
          className="btn shadow-none"
          onClick={() => {
            props.onClose();
          }}
        >
          <FontAwesomeIcon className="fa-xl pl-5" icon={faAngleRight} />
        </button>
        <p className="text-center">Participant Details </p>
      </div>
      <div className="text-center">{tableEachRow()}</div>
    </div>
  );
};

export default ParticipantDetails;
