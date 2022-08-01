import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import clsx from "clsx";
import { useStudyColorClassnames } from "../hooks/useStudyColorClassnames";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightFromBracket, faCircleUser
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
// import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

const Appbar: React.FC = () => {
  const appContext = useAppContext();
  const authContext = useAuthContext();

  const { bgColor, color, borderClassName } = useStudyColorClassnames();

  const exitStudyButton = appContext.studyInfo ? (
    <div className="flex-grow-1" style={{ width: 0 }}>
      {appContext.studyInfo !== undefined ? (
        <NavLink className={clsx(
          "nav-link ",
          color
        )} to="../">
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Exit Study</Tooltip>}>
            <span>
              <FontAwesomeIcon className="fa-lg me-2" icon={faArrowLeft} />

              <span className="d-none d-md-inline-block">Exit Study</span>
            </span>
          </OverlayTrigger>

        </NavLink>
      ) : null}
    </div>
  ) : null;

  const studyName = appContext.studyInfo ? (
    <h1
      className={clsx(
        "flex-grow-1 text-center mx-3 h6 m-0",
      )}>
      {appContext.studyInfo.name}
    </h1>
  ) : null;

  return (
    <div
      className={clsx(
        "border-bottom d-flex align-items-center py-2",
        bgColor,
        color,
        borderClassName
      )}
    >
      {exitStudyButton}
      {studyName}
      <span className="flex-grow-1"></span>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>{authContext.userID}</Tooltip>}>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            className="fa-lg me-2"
            icon={faCircleUser}
          />
          <span className="d-none d-md-block me-2">{authContext.userID}</span>
        </div>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
        <button className={clsx("btn", color)}
          onClick={() => authContext.logout()}
        >
          <FontAwesomeIcon
            className="fa-lg me-2"
            icon={faArrowRightFromBracket}
          />
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default Appbar;
