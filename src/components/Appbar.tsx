import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import clsx from "clsx";
import { useStudyColorClassnames } from "../hooks/useStudyColorClassnames";

const Appbar: React.FC = () => {
  const appContext = useAppContext();
  const { bgColor, color } = useStudyColorClassnames();

  const studyName = appContext.studyInfo ? appContext.studyInfo.name : 'Select a study';

  return (
    <div className={clsx(
      "border-bottom border-secondary d-flex align-items-center",
      bgColor,
      color
    )}>
      <div style={{ width: 200 }}>

      </div>
      <div className="flex-grow-1 text-center">
        <h1 className={clsx(
          "h6 m-0",
          color,
        )}>{studyName}</h1>
      </div>
      <span>Logged in as: {"todo"}</span>
      <button className="btn">Logout</button>
    </div>
  );
};

export default Appbar;
