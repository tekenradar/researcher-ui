import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";


export interface AppContextData {
  studyKey: string | undefined;
}


export const useAppContextValue = (): AppContextData => {
  let params = useParams();

  return {
    studyKey: params.studykey,
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
