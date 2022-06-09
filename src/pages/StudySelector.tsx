import React from "react";
import { Link } from "react-router-dom";
import "./../stylesheets/css/pages/StudySelector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const dummyStudies = [
  { key: "dummy", name: "Dummy study" },
  { key: "dummy-2", name: "Dummy study 2" },
];

const StudySelector: React.FC = () => {
  return (
    <div className="container-fluid h-100 bg-appThemeColor px-4 justify-content-center">
      <div className="row justify-content-center gx-5 p-3">
        {dummyStudies.map((study, index) => (
          <div className="col-3">
            <div className="card rounded" key={study.key}>
              <Link
                type="button"
                className={`${
                  index === 0 ? "bg-firstStudyColor" : "bg-secondStudyColor"
                } btn cardBtn card-body shadow-none border border-secondary`}
                to={study.key}
              >
                {study.name} <FontAwesomeIcon icon={faAnglesRight} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudySelector;
