import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const isIphoneWithNotch = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
};

export const isIphoneWithDynamicIsland = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 852 || width === 852 || height === 932 || width === 932)
  );
};
