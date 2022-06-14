import { useAppContext } from "./useAppContext";


export const useStudyColorClassnames = (): {
  bgColor: string;
  color: string;
} => {
  const appContext = useAppContext();

  return {
    bgColor: `alert-study-${appContext.studyKey}`,
    color: `text-study-${appContext.studyKey}`
  }
}

