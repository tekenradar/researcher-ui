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


export const dummyStudies = [
  {
    key: "tekenradar", name: "Tekenradar", description: "Default study of tekenradar",
    studyColor: 'color-1',
    features: {
      datasetExporter: true,
      contacts: false,
    }
  },
  {
    key: "tb-only", name: "TB only ", description: "Tickbite reports without health data",
    studyColor: 'color-2',
    features: {
      datasetExporter: true,
      contacts: false,
    }
  },
  {
    key: "weekly-tb", name: "Weekly TB", description: "Weekly TB Cohort in collaboration with...",
    studyColor: 'color-3',
    features: {
      datasetExporter: true,
      contacts: false,
    }
  },
  //
  {
    key: "k-em-contact", name: "kEM", description: "kEM with contact data",
    studyColor: 'color-4',
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "em-adult-contact", name: "EM Adult", description: "EM Adults with contact data",
    studyColor: 'color-5',
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "fever-adult-contact", name: "Fever Adult", description: "Fever Adults with contact data",
    studyColor: 'color-6',
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "tb-adult-contact", name: "TB Adults", description: "TB Adults with contact data",
    studyColor: 'color-7',
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "tb-kids-contact", name: "TB Kids", description: "TB Kids with contact data",
    studyColor: 'color-8',
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
];

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
      const url = new URL(`${apiRoot}/v1/study/${studyKey}/`);

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
