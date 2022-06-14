import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import clsx from "clsx";
import { useStudyColorClassnames } from "../hooks/useStudyColorClassnames";

const Appbar: React.FC = () => {
  const appContext = useAppContext();
  const { bgColor, color } = useStudyColorClassnames();

  console.log(appContext)

  return (
    <div className={clsx(
      "border-bottom border-secondary d-flex justify-content-end align-items-center",
      bgColor,
      color
    )}>

      <span>Logged in as: {"todo"}</span>
      <button className="btn">Logout</button>
    </div>
  );
};

export default Appbar;
