// import * as Sentry from "sentry-expo"
// import * as Sentry from "@sentry/react-native"

export enum ErrorType {
  /**
   * An error that would normally cause a red screen in dev
   * and force the user to sign out and restart.
   */
  FATAL = 'Fatal',
  /**
   * An error caught by try/catch where defined using Reactotron.tron.error.
   */
  HANDLED = 'Handled',
}

export const initCrashReporting = (): void => {
  /*
    Sentry.init({
        dsn: '',
        debug: __DEV__,
    });
  */
};

export const reportCrash = (
  error: any,
  type: ErrorType = ErrorType.FATAL,
): void => {
  if (__DEV__) {
    const message = error.message || 'Unknown';
    console.error(error);
    console.log(message, type);
  } else {
    // In production, utilize crash reporting service of choice below:
    // RN
    // Sentry.captureException(error)
    // Expo
    // Sentry.Native.captureException(error)
    // crashlytics().recordError(error)
    // Bugsnag.notify(error)
  }
};
