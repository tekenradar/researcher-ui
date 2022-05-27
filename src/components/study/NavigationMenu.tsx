import clsx from "clsx";
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { MdSettingsSuggest } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { MdOutlineExitToApp } from "react-icons/md";
import { MdClose } from "react-icons/md";

interface NavigationMenuProps {
  onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  let params = useParams();
  return (
    <div
      className="border-end h-100 d-flex flex-column"
      style={{ minHeight: "100%", width: 60 }}
    >
      <Nav className="flex-column flex-grow-1">
        <NavLink
          to="#"
          style={{ paddingBottom: "1.5rem", paddingLeft: "2rem" }}
          onClick={() => {
            props.onClose();
          }}
        >
          <MdClose size={20}/>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          to="exporter"
        >
          <MdImportExport size={28}/>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          to="participant-records"
        >
          <MdSupervisorAccount size={28}/>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx("nav-link", { "active fw-bold": isActive })
          }
          to="settings"
        >
          <MdSettingsSuggest size={28}/>
        </NavLink>
        <div className="flex-grow-1"></div>
        <NavLink className={"nav-link text-danger pb-4 fw-bold"} to="../">
        <MdOutlineExitToApp size={28}/>
        </NavLink>
      </Nav>
    </div>
  );
};

export default NavigationMenu;
