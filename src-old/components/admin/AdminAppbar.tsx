import React from "react";
import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightFromBracket, faCircleUser
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";



const AdminAppbar: React.FC = () => {
  return <p>todo</p>
  /*const authContext = useAuthContext();

  const exitButton = <div className="flex-grow-1" style={{ width: 0 }}>

    <NavLink className={clsx(
      "nav-link ps-3",

    )} to="/">
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Exit Substudy Management</Tooltip>}>
        <span>
          <FontAwesomeIcon className="fa-lg me-2" icon={faArrowLeft} />

          <span className="d-none d-md-inline-block">Exit Sub-study Management</span>
        </span>
      </OverlayTrigger>

    </NavLink>
  </div>
    ;

  return (
    <div
      className={clsx(
        "border-bottom d-flex align-items-center py-2 bg-white",
      )}
    >
      {exitButton}
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
        <button className={clsx("btn")}
          onClick={() => authContext.logout()}
        >
          <FontAwesomeIcon
            className="fa-lg me-2"
            icon={faArrowRightFromBracket}
          />
        </button>
      </OverlayTrigger>
    </div>
  );*/
};

export default AdminAppbar;
