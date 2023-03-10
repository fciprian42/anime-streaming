import { StyleSheet } from "react-native";

import { border, colors, ContextProps } from "@themes/index";

export const styles = (theme: ContextProps) =>
  StyleSheet.create({
    inputContainer: {
      position: "relative",
      marginBottom: theme.spacing.large,
    },
    input: {
      width: "100%",
      paddingHorizontal: 20,
      backgroundColor: theme.colors.input,
      color: theme.colors.inputSelection,
      borderRadius: border.radius.medium,
      minHeight: 56,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    icon: {
      position: "absolute",
      zIndex: 2,
      left: 12,
      top: 11,
    },
    secureIndicator: {
      position: "absolute",
      zIndex: 2,
      right: 12,
      top: 11,
    },
  });
