import React, { useEffect, useState } from "react";
import { dummyStudies, StudyInfo } from "../hooks/useAppContext";
import StudyInfoCard from "../components/study/StudyInfoCard";
import Credits from "../components/Credits";
import Appbar from "../components/Appbar";


const StudySelector: React.FC = () => {
  const [studies, setStudies] = useState<StudyInfo[]>([])

  useEffect(() => {
    setStudies(dummyStudies)
  }, [])

  return (
    <React.Fragment>
      <Appbar />

      <div className="container h-100 justify-content-center overflow-scroll">
        <div className="row justify-content-start g-3 py-3">
          <h2 className="h4 mb-0">Select a study</h2>
          {
            studies.map((study) => <StudyInfoCard
              key={study.key}
              study={study}
            />
            )
          }
        </div>
        <Credits />
      </div>
    </React.Fragment>
  );
};

export default StudySelector;
