import { ViewStyle } from 'react-native';

import { Color } from 'themes';

export const useShadowStyle = (
  shadowColor: Color,
  shadowOffset: { width: number; height: number },
  shadowRadius: number,
  shadowOpacity: number = 1,
): ViewStyle => {
  return {
    shadowColor,
    shadowOffset,
    shadowRadius,
    shadowOpacity,
  };
};
