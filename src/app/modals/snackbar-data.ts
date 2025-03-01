export type snackInfo = {
};

export interface SnackbarData {
  type: SnackbarType;
  text: string;
  subText?: string;
  info?: snackInfo;
  action?: {
    title: string;
  };
}

export enum SnackbarType {
  ERROR,
  WARN,
  INFO,
  SUCCESS,
}
