import { useAppContext } from "./useAppContext";


export const useStudyColorClassnames = (): {
  bgColor: string;
  color: string;
} => {
  const appContext = useAppContext();

  if (appContext.studyKey === undefined) {
    return {
      bgColor: `bg-white`,
      color: `text-dark`
    }
  }

  return {
    bgColor: `alert-study-${appContext.studyKey}`,
    color: `text-study-${appContext.studyKey}`
  }
}

