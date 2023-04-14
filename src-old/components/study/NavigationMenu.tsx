import clsx from "clsx";
import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAppContext } from "../../hooks/useAppContext";

interface NavigationMenuProps { }

interface NavMenuItemProps {
  tooltip: string;
  to: string;
  icon: IconProp;
  bgColorClass: string;
  colorClass: string;
}

const NavMenuItem: React.FC<NavMenuItemProps> = (props) => {
  return <OverlayTrigger
    placement="right"
    overlay={
      <Tooltip>{props.tooltip}</Tooltip>
    }
  >
    <NavLink
      className={({ isActive }) =>
        clsx("nav-link py-3 text-center scale-effect-on-hover", props.colorClass, { ["active text-white bg-secondary fw-bold " + props.bgColorClass]: isActive })
      }
      to={props.to} //  "settings"
    >
      <FontAwesomeIcon className="fa-xl icon" icon={props.icon} />
    </NavLink>
  </OverlayTrigger>
}


const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  const { studyInfo } = useAppContext();
  const { bgColor, color, bgDarkColor, borderClassName } = useStudyColorClassnames();

  return (
    <div
      className={clsx(
        "border-end border-secondary h-100 d-flex flex-colum",
        borderClassName,
        bgColor,
      )}
      style={{ minHeight: "100%" }}
    >
      <Nav className="flex-column flex-grow-1">
        {studyInfo?.features.datasetExporter ?
          <NavMenuItem
            tooltip="Data Exporter"
            colorClass={color}
            bgColorClass={bgDarkColor}
            to="exporter"
            icon={faFileExport}
          /> : null}
        {studyInfo?.features.contacts ?
          <NavMenuItem
            tooltip="Participant Contacts"
            colorClass={color}
            bgColorClass={bgDarkColor}
            to="contacts"
            icon={faAddressCard}
          /> : null}
      </Nav>
    </div>
  );
};

export default NavigationMenu;
