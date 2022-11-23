import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface StudyInfo {
  key: string;
  name: string;
  description: string;
  studyColor: string;
  features: {
    datasetExporter: boolean;
    contacts: boolean;
  };
  availableDatasets?: DatasetInfo[];
  contactFeatureConfig: {
    includeWithParticipantFlags: { [key: string]: string }
  }
}

export interface DatasetInfo {
  id: string;
  surveyKey: string;
  name: string;
  excludeColumns: string[];
  startDate: number;
  endDate: number;
}


export interface AppContextData {
  studyKey: string | undefined;
  studyInfo: StudyInfo | undefined;
  isLoading: boolean;
}


const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyKey])


  const getStudyInfo = async (studyKey: string) => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const url = new URL(`${apiRoot}/v1/substudy/${studyKey}/`);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setStudyInfos(data);
    } catch (err: any) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
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
