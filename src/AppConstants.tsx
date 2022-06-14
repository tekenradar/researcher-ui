export enum studyTheme {
  dummy = "study-tekenradar",
  dummy_2 = "secondStudyTheme",
}
export class AppConstants {
  private static instance: AppConstants;

  private constructor() { }

  public static getInstance(): AppConstants {
    if (!AppConstants.instance) {
      AppConstants.instance = new AppConstants();
    }

    return AppConstants.instance;
  }

  public static getStudyTheme(key: string): string {
    switch (key) {
      case "dummy":
        return studyTheme.dummy;
      case "dummy_2":
        return studyTheme.dummy_2;
      default:
        return studyTheme.dummy;
    }
  }
}
