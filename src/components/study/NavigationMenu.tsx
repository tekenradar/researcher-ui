import clsx from 'clsx';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import settingIcon from "/Users/syed/researcher-ui/src/assets/icons/setting.png";
import dataExportIcon from "/Users/syed/researcher-ui/src/assets/icons/data_export.png";
import participantsRecordIcon from "/Users/syed/researcher-ui/src/assets/icons/participants_record.png";
import exitIcon from "/Users/syed/researcher-ui/src/assets/icons/exit.png";
import cancelIcon from "/Users/syed/researcher-ui/src/assets/icons/cancel.png";

interface NavigationMenuProps {
  onClose: () => void;
}


const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  let params = useParams();
  return (
    <div className='border-end h-100 d-flex flex-column' style={{ minHeight: '100%', width: 80 }}>
      <Nav className="flex-column  flex-grow-1">
      <NavLink  
          to="#" style={{paddingBottom: "1.5rem", paddingLeft: "2.8rem" }} onClick={()=>{props.onClose()}}>
          <img
            src={cancelIcon}
            alt="Cancel"
            width="26"
            height="26"
          />
        </NavLink>
        <NavLink className={({ isActive }) => clsx('nav-link', { 'active fw-bold': isActive }) }
          to="exporter">
          <img
            src={dataExportIcon}
            alt="Data Exporter"
            width="40"
            height="40"
          />
        </NavLink>
        <NavLink className={({ isActive }) => clsx('nav-link', { 'active fw-bold': isActive })}
          to="participant-records">
           <img
            src={participantsRecordIcon}
            alt="Participants Record"
            width="40"
            height="40"
          />
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx('nav-link', { 'active fw-bold': isActive })}
          to="settings">
           <img src={settingIcon} alt="Setting" width="40" height="40" />
        </NavLink>
        <div className='flex-grow-1'></div>
        <NavLink
          className={'nav-link text-danger pb-4 fw-bold'}
          to="../">
          <img src={exitIcon} alt="Exit" width="40" height="40" />
        </NavLink>

      </Nav>
    </div>
  );
};

export default NavigationMenu;