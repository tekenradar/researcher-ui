import clsx from "clsx";
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/css/components/study/NavigationMenu.css";
import { AppConstants } from "../../AppConstants";
interface NavigationMenuProps {}

const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  let { studykey } = useParams();
  return (
    <div
      className={`border-end h-100 d-flex flex-column ${AppConstants.getStudyTheme(
        "" + studykey
      )}`}
      style={{ minHeight: "100%", width: 60 }}
    >
      <Nav className="flex-column flex-grow-1">
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          to="exporter"
        >
          <FontAwesomeIcon className="fa-xl icon" icon={faFileExport} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          style={{ paddingBottom: "1rem" }}
          to="participant-records"
        >
          <FontAwesomeIcon className="fa-xl icon" icon={faAddressCard} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          style={{ paddingBottom: "1rem" }}
          to="settings"
        >
          <FontAwesomeIcon className="fa-xl icon" icon={faGears} />
        </NavLink>
        <div className="flex-grow-1"></div>
        <NavLink className={"nav-link text-danger pb-4 fw-bold"} to="../">
          <FontAwesomeIcon className="fa-xl" icon={faArrowRightFromBracket} />
        </NavLink>
      </Nav>
    </div>
  );
};

export default NavigationMenu;
