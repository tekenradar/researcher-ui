import { useAppContext } from "./useAppContext";

export const useStudyColorClassnames = (): {
  bgColor: string;
  color: string;
  bgDarkColor: string;
  borderClassName: string;
  btnClassName: string;
} => {
  const appContext = useAppContext();

  if (appContext.studyKey === undefined) {
    return {
      bgColor: `bg-white`,
      color: `text-dark`,
      bgDarkColor: "bg-primary",
      borderClassName: "border-secondary",
      btnClassName: "btn-primary",
    };
  }

  return {
    bgColor: `alert-study-${appContext.studyKey}`,
    bgDarkColor: `bg-study-${appContext.studyKey}`,
    color: `text-study-${appContext.studyKey}`,
    borderClassName: `border-study-${appContext.studyKey}`,
    btnClassName: `btn-study-${appContext.studyKey}`,
  };
};
