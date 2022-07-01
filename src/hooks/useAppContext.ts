import { features } from "process";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface StudyInfo {
  key: string;
  name: string;
  description: string;
  features: {
    datasetExporter: boolean;
    contacts: boolean;
  }
}


export interface AppContextData {
  studyKey: string | undefined;
  studyInfo: StudyInfo | undefined;
  isLoading: boolean;
}


export const dummyStudies = [
  {
    key: "tekenradar", name: "Tekenradar", description: "Default study of tekenradar",
    features: {
      datasetExporter: true,
      contacts: false,
    }
  },
  {
    key: "tb-only", name: "TB only ", description: "Tickbite reports without health data",
    features: {
      datasetExporter: true,
      contacts: false,
    }
  },
  {
    key: "weekly-tb", name: "Weekly TB", description: "Weekly TB Cohort in collaboration with...",
    features: {
      datasetExporter: true,
      contacts: false,
    }
  },
  //
  {
    key: "k-em-contact", name: "kEM", description: "kEM with contact data",
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "em-adult-contact", name: "EM Adult", description: "EM Adults with contact data",
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "fever-adult-contact", name: "Fever Adult", description: "Fever Adults with contact data",
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "tb-adult-contact", name: "TB Adults", description: "TB Adults with contact data",
    features: {
      datasetExporter: true,
      contacts: true,
    }
  },
  {
    key: "tb-kids-contact", name: "TB Kids", description: "TB Kids with contact data", features: {
      datasetExporter: true,
      contacts: true,
    }
  },
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
    setTimeout(() => {
      const currentStudy = dummyStudies.find(study => study.key === studyKey);
      setStudyInfos(currentStudy);
      setIsLoading(false);
    }, 1000)
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
