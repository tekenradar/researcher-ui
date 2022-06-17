import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface StudyInfo {
  key: string;
  name: string;
  description: string;
}


export interface AppContextData {
  studyKey: string | undefined;
  studyInfo: StudyInfo | undefined;
  isLoading: boolean;
}


export const dummyStudies = [
  { key: "tekenradar", name: "Tekenradar", description: "Default study of tekenradar" },
  { key: "weekly-tb", name: "Weekly TB", description: "Weekly TB Cohort in collaboration with..." },
  { key: "weekly-tb2", name: "Weekly TB", description: "Weekly TB Cohort in collaboration with..." },
  { key: "weekly-tb3", name: "Weekly TB", description: "Weekly TB Cohort in collaboration with..." },
  { key: "weekly-tb4", name: "Weekly TB", description: "Weekly TB Cohort in collaboration with..." },
  { key: "weekly-tb5", name: "Weekly TB", description: "Weekly TB Cohort in coll wid sdosno dfnsodfnsodfknaboration with..." },
];


export const useAppContextValue = (): AppContextData => {
  let params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [studyInfo, setStudyInfos] = useState<StudyInfo | undefined>(undefined);

  const studyKey = params.studykey;

  useEffect(() => {
    if (studyKey === undefined) {
      setStudyInfos(undefined);
      return;
    }
    getStudyInfo(studyKey)
  }, [studyKey])


  const getStudyInfo = async (studyKey: string) => {
    if (isLoading) {
      return;
    }
    console.warn('TODO: fetch study infos')
    setIsLoading(true);
    const currentStudy = dummyStudies.find(study => study.key === studyKey);
    setStudyInfos(currentStudy);
    setIsLoading(false);
  }


  return {
    studyKey: studyKey,
    studyInfo: studyInfo,
    isLoading: isLoading,
  }
}


export const useAppContext = (): AppContextData => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('useAppContext must be used within the AppContext.Provider');
  }
  return appContext;
}


export const AppContext = createContext<AppContextData | undefined>(undefined);
