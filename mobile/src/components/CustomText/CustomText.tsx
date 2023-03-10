import React from "react";

import { StyleProp, Text, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import RenderHtml from "react-native-render-html";

import { useAdjustTextSize, useTheme, useThemedStyles } from "@hooks/index";

import { styles } from "./customText.styles";

import { CustomTextProps } from "./customText.props";

const CustomText: React.FC<CustomTextProps> = (props) => {
  const {
    type,
    isHTML = false,
    content,
    style,
    isBold = false,
    color,
    align = "center",
    animated,
    ...rest
  } = props;

  const { colors } = useTheme();
  const themedStyle = useThemedStyles(styles);

  let textStyle: StyleProp<TextStyle> = {};
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style;

  switch (type) {
    case "h1":
      textStyle = {
        ...themedStyle.title,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(36),
      };
      break;
    case "h2":
      textStyle = {
        ...themedStyle.title,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(28),
      };
      break;
    case "h3":
      textStyle = {
        ...themedStyle.text,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(24),
      };
      break;
    case "h4":
      textStyle = {
        ...themedStyle.text,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(18),
      };
      break;
    case "h5":
      textStyle = {
        ...themedStyle.text,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(16),
      };
      break;
    case "h6":
      textStyle = {
        ...themedStyle.text,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(12),
      };
      break;
    default:
      textStyle = {
        ...themedStyle.title,
        ...(isBold ? { fontWeight: "600" } : null),
        fontSize: useAdjustTextSize(28),
      };
      break;
  }

  return animated ? (
    <Animated.Text
      style={[
        textStyle,
        { textAlign: align },
        { ...passedStyles },
        color && { color: colors[color] },
      ]}
      {...rest}
    >
      {isHTML ? <RenderHtml source={{ html: content }} /> : content}
    </Animated.Text>
  ) : (
    <Text
      style={[
        textStyle,
        { textAlign: align },
        { ...passedStyles },
        color && { color: colors[color] },
      ]}
      {...rest}
    >
      {isHTML ? <RenderHtml source={{ html: content }} /> : content}
    </Text>
  );
};

export default CustomText;
