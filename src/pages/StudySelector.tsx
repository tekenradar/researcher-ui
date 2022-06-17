import React, { useEffect, useState } from "react";
import { dummyStudies, StudyInfo } from "../hooks/useAppContext";
import StudyInfoCard from "../components/study/StudyInfoCard";


const StudySelector: React.FC = () => {
  const [studies, setStudies] = useState<StudyInfo[]>([])

  useEffect(() => {
    setStudies(dummyStudies)
  }, [])

  return (
    <div className="container h-100 justify-content-center">
      <div className="row justify-content-start g-3 py-3">
        {
          studies.map((study) => <StudyInfoCard
            key={study.key}
            study={study}
          />
          )
        }
      </div>
    </div>
  );
};

export default StudySelector;
