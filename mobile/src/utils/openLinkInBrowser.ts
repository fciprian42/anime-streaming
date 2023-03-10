import { Linking } from 'react-native';

/**
 * Helper for opening a give URL in an external browser.
 */
export const openLinkInBrowser = (url: string): void => {
  Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url));
};
