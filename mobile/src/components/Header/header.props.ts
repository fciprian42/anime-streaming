import { TouchableOpacityProps } from "react-native";

import { IconTypes } from "@interfaces/icons";

export interface HeaderProps {
  /**
   * The title header
   */
  title: string;

  /**
   * An optional icon for the header
   */
  icon?: IconTypes;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];

  /**
   * Searching component
   */
  searching?: boolean;
}
