import { ImageStyle, StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";

import { iconRegistry } from "@interfaces/icons";

export type IconTypes = keyof typeof iconRegistry;

export interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes | string;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];

  /**
   * Callback function when the image is ready
   */
  loadCallback?: () => void;
}
