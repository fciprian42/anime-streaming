import { StyleSheet } from "react-native";

import { ContextProps } from "@themes/index";

export const styles = (theme: ContextProps) =>
  StyleSheet.create({
    title: {
      fontWeight: "500",
      fontFamily: theme.typography.primary.medium,
    },
    text: {
      fontWeight: "400",
      fontFamily: theme.typography.primary.medium,
    },
  });
