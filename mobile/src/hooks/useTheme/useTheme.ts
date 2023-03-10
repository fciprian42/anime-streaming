import { useContext } from "react";
import { ThemeContext } from "@themes/index";

export const useTheme = () => {
  return useContext(ThemeContext);
};
