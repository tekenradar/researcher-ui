import React from "react";
import { Link } from "react-router-dom";
import "./../stylesheets/css/pages/StudySelector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { AppConstants } from "../AppConstants";

const dummyStudies = [
  { key: "dummy", name: "Dummy study" },
  { key: "dummy_2", name: "Dummy study 2" },
];

const StudySelector: React.FC = () => {
  return (
    <div className="container-fluid h-100 bg-homePageBgColor px-4 justify-content-center">
      <div className="row justify-content-center gx-5 p-3">
        {dummyStudies.map((study, index) => (
          <div className="col-3">
            <div className="card rounded" key={study.key}>
              <Link
                type="button"
                className={`${AppConstants.getStudyTheme(
                  study.key
                )}  btn cardBtn card-body shadow-none border border-secondary fw-bold`}
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
