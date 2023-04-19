import clsx from "clsx";
import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

import { IconProp } from "@fortawesome/fontawesome-svg-core";


interface NavigationMenuProps { }

interface NavMenuItemProps {
  tooltip: string;
  to: string;
  icon: IconProp;
  bgColorClass: string;
  colorClass: string;
}


const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {


  return (
    <div
      className={clsx(
        "border-end border-secondary h-100 d-flex flex-colum",

      )}
      style={{ minHeight: "100%" }}
    >
      {/*
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
        */}
    </div>
  );
};

export default NavigationMenu;
