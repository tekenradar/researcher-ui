import clsx from "clsx";
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface NavigationMenuProps {
  onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let params = useParams();
  return (
    <div
      className="border-end h-100 d-flex flex-column"
      style={{ minHeight: "100%", width: 60 }}
    >
      <Nav className="flex-column flex-grow-1">
        <NavLink
          to="#"
          style={{ paddingBottom: "1.5rem", paddingLeft: "2.4rem" }}
          onClick={() => {
            props.onClose();
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          style={{ paddingBottom: "1rem" }}
          to="exporter"
        >
          <FontAwesomeIcon className="fa-xl" icon={faFileExport} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          style={{ paddingBottom: "1rem" }}
          to="participant-records"
        >
          <FontAwesomeIcon className="fa-xl" icon={faAddressCard} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          style={{ paddingBottom: "1rem" }}
          to="settings"
        >
          <FontAwesomeIcon className="fa-xl" icon={faGears} />
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
