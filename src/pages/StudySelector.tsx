import React from "react";
import { Link } from "react-router-dom";
import "./../stylesheets/css/pages/StudySelector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";


const dummyStudies = [
  { key: "tekenradar", name: "Tekenradar" },
  { key: "weekly-tb", name: "Weekly TB" },
];

const StudySelector: React.FC = () => {

  return (
    <div className="container-fluid h-100 px-4 justify-content-center">
      <div className="row justify-content-center gx-5 p-3">
        {
          dummyStudies.map((study, index) => {
            const bgColor = `alert-study-${study.key}`;
            const color = `text-study-${study.key}`;

            return <div className="col-3">
              <div className="card rounded" key={study.key}>
                <Link
                  type="button"
                  className={`${bgColor} ${color} btn cardBtn text-study-tekenradar card-body shadow-none border border-secondary fw-bold`}
                  to={study.key}
                >
                  {study.name} <FontAwesomeIcon icon={faAnglesRight} />
                </Link>
              </div>
            </div>
          })}
      </div>
    </div>
  );
};

export default StudySelector;
