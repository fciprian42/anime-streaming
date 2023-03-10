import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";

import { ButtonType, ButtonTheme, ShadowConfig } from "@interfaces/button";
import { TextType } from "@interfaces/text";

import { Colors } from "@themes/index";

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * The type of the button
   */
  type: ButtonType;

  /**
   * Size of the button text
   */
  text?: TextType;

  /**
   * Theme of the button
   */
  theme?: ButtonTheme;

  /**
   * Text of the button
   */
  content?: string;

  /**
   * Is the button contain icon
   */
  icon?: Element;

  /**
   * Button loading state
   */
  isLoading?: boolean;

  /**
   * Override button styles
   */
  buttonStyles?: StyleProp<ViewStyle>;

  /**
   * If button contain children and not text
   */
  children?: React.ReactElement;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];

  /**
   * Color of the text button
   */
  color?: Colors;

  /**
   * Shadow config for the button
   */
  shadowConfig?: ShadowConfig;
}
