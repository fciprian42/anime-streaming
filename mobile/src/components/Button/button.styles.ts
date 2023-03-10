import { StyleSheet } from "react-native";

import { ContextProps } from "@themes/index";

export const styles = (theme: ContextProps) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      width: "100%",
      borderRadius: theme.borders.radius.large,
    },
    social: {
      paddingVertical: 12,
      borderRadius: theme.borders.radius.large,

      backgroundColor: theme.colors.background,
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
    },
  });
