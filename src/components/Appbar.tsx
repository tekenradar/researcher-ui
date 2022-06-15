import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import clsx from "clsx";
import { useStudyColorClassnames } from "../hooks/useStudyColorClassnames";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Appbar: React.FC = () => {
  const appContext = useAppContext();
  const { bgColor, color, borderClassName } = useStudyColorClassnames();

  const studyName = appContext.studyInfo ? appContext.studyInfo.name : 'Select a study';

  const exitStudyButton = <div style={{ width: 200 }}>
    {appContext.studyInfo !== undefined ? <NavLink className={clsx(
      "nav-link",
      color
    )} to="../">
      <FontAwesomeIcon className="fa-lg me-2" icon={faArrowLeft} />
      Exit Study
    </NavLink> : null}

  </div>

  return (
    <div className={clsx(
      "border-bottom d-flex align-items-center py-2",
      bgColor,
      color,
      borderClassName,
    )}>
      {exitStudyButton}
      <h1 className={clsx(
        "flex-grow-1 text-center h6 m-0",
        color,
      )}>{studyName}</h1>

      <span>Logged in as: {"todo-email@domain.tld"}</span>
      <button className={clsx("btn", color)}>
        <FontAwesomeIcon className="fa-lg me-2" icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
};

export default Appbar;
