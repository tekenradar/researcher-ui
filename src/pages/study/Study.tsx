import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/study/NavigationMenu";
import { MdOutlineMenu } from "react-icons/md";
import "./study.css";
const Study: React.FC = () => {
  const [isNavbarOpen, setNavbarStatus] = useState(false);
  const [isMenuVisible, setMenuVisibilily] = useState(true);
  return (
    <div
      className={`${
        isNavbarOpen ? "active" : "deactive"
      } d-flex flex-row h-100 align-items-stretch`}
    >
      <NavigationMenu
        onClose={() => {
          setNavbarStatus(false);
          setTimeout(() => {
            setMenuVisibilily(true);
          }, 400);
        }}
      />
      <div className="flex-grow-1">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setNavbarStatus(!isNavbarOpen);
            setTimeout(() => {
              setMenuVisibilily(false);
            }, 100);
          }}
          style={{
            width: "40px",
            height: "35px",
            paddingLeft: "0.5rem",
            paddingTop: "0.1rem",
            opacity: !isMenuVisible ? "0" : "1",
            transition: "all 0.5s",
          }}
        >
          <MdOutlineMenu style={{ alignContent: "center" }} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default Study;
