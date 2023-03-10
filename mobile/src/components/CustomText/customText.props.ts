import { TextProps } from "react-native";

import { TextType } from "@interfaces/text";
import { Colors } from "@themes/index";

export interface CustomTextProps extends TextProps {
  /**
   * Size of the text.
   */
  type: TextType;

  /**
   * Rendering HTML
   */
  isHTML?: boolean;

  /**
   * If the text should be bold
   */

  isBold?: boolean;

  /**
   * Content text
   */
  content: string | React.ReactNode;

  /**
   * Optional text color.
   */
  color?: Colors;

  /**
   * Optional text aligmnement
   */
  align?: "center" | "justify" | "left" | "right";

  /**
   * Is the text animated
   */
  animated?: boolean;

  /**
   * Rendering html content
   */
  html?: boolean;
}
