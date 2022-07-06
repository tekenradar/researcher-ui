import { useAppContext } from "./useAppContext";


export const useStudyColorClassnames = (): {
  bgColor: string;
  color: string;
  bgDarkColor: string;
  borderClassName: string;
  btnClassName: string;
} => {
  const appContext = useAppContext();

  if (appContext.studyInfo === undefined) {
    return {
      bgColor: `bg-white`,
      color: `text-dark`,
      bgDarkColor: 'bg-primary',
      borderClassName: 'border-secondary',
      btnClassName: 'btn-primary',
    }
  }
  const studyColor = appContext.studyInfo.studyColor;
  return {
    bgColor: `alert-study-${studyColor}`,
    bgDarkColor: `bg-study-${studyColor}`,
    color: `text-study-${studyColor}`,
    borderClassName: `border-study-${studyColor}`,
    btnClassName: `btn-study-${studyColor}`,
  }
}

