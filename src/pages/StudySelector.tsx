import React, { useEffect, useState } from "react";
import { StudyInfo } from "../hooks/useAppContext";
import StudyInfoCard from "../components/study/StudyInfoCard";
import Credits from "../components/Credits";
import Appbar from "../components/Appbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { Spinner } from "react-bootstrap";


const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";

const StudySelector: React.FC = () => {
  const authContext = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [studies, setStudies] = useState<StudyInfo[]>([])

  useEffect(() => {
    if (authContext.userID) {
      fetchStudyInfos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.userID])

  const fetchStudyInfos = async () => {
    try {
      setIsLoading(true);
      const url = new URL(`${apiRoot}/v1/study/infos`);

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setStudies(data.studyInfos);
    } catch (err: any) {
      console.error(err)
      authContext.logout();
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="d-flex align-items-center w-100 justify-content-center vh-100">
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
      <Spinner className="mx-1" size="sm" animation="grow" />
    </div>
  }

  return (
    <React.Fragment>
      <Appbar />

      <div className="container h-100 justify-content-center overflow-scroll">
        <div className="row justify-content-start g-3 py-3">
          <h2 className="h4 mb-0">Select a study</h2>
          {studies.length < 1 ? <p>Currently, you don't have access to any study. Please ask the Tekenradar Researcher Team admin.</p> : null}
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
