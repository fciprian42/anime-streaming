import React, { ComponentType } from "react";
import {
  Pressable,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";

import CustomText from "@components/CustomText";

import { hitSlops } from "@themes/index";
import { useShadowStyle, useTheme, useThemedStyles } from "@hooks/index";

import { styles } from "./button.styles";
import { ButtonProps } from "./button.props";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    disabled,
    theme,
    icon,
    content,
    color,
    isLoading = false,
    children,
    buttonStyles,
    shadowConfig,
    text = "h5",
    ...rest
  } = props;

  const { colors, spacing } = useTheme();
  const style = useThemedStyles(styles);

  const overrideStyles = buttonStyles ? buttonStyles : style.button;

  const buttonShadow = shadowConfig
    ? {
        ...useShadowStyle(
          shadowConfig.shadowColor,
          shadowConfig.shadowOffset,
          shadowConfig.shadowRadius,
          shadowConfig.shadowOpacity
        ),
      }
    : null;

  const buttonTheme: ViewStyle = {
    backgroundColor:
      theme === "primary"
        ? colors.primary
        : theme === "secondary"
        ? colors.secondary
        : "rgba(0, 0, 0, 0)",
  };

  const textColor: TextStyle = {
    color: color ? colors[color] : colors.button,
  };

  const Wrapper: ComponentType<TouchableOpacityProps> = rest?.activeOpacity
    ? TouchableOpacity
    : Pressable;

  if (type === "social") {
    return (
      <Pressable
        hitSlop={hitSlops.regular}
        style={[style.social, overrideStyles, buttonShadow]}
        {...props}
      >
        {content ? (
          <>
            {icon && icon}
            <CustomText
              type={text}
              style={[textColor, { marginStart: spacing.regular }]}
              content={content}
            />
          </>
        ) : (
          children
        )}
      </Pressable>
    );
  }

  return (
    <Wrapper
      hitSlop={hitSlops.regular}
      style={[
        overrideStyles,
        disabled ? { backgroundColor: colors.input } : buttonTheme,
        buttonShadow,
      ]}
      {...props}
    >
      {isLoading && <ActivityIndicator color={colors.secondary} />}
      {!isLoading && content && (
        <>
          {icon && icon}
          <CustomText
            type={text}
            style={[textColor, icon && { marginStart: 10 }]}
            content={content}
            color={color}
          />
        </>
      )}
      {!content && !isLoading && children}
    </Wrapper>
  );
};

export default Button;
