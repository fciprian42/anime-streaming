import React, { PropsWithChildren, useState } from "react";

import { typography, Typography } from "./typography";
import { Theme } from "./colors";
import { Border, border, Spacing, spacing } from "./metrics";

export interface ContextProps {
  colors: Theme;
  typography: Typography;
  borders: Border;
  spacing: Spacing;
  dark: boolean;
  toggleTheme: () => void;
}

interface Props extends PropsWithChildren {
  theme: Theme;
  dark: boolean;
}

export const ThemeContext = React.createContext<ContextProps>({
  colors: null,
  typography: null,
  borders: null,
  spacing: null,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<Props> = (props) => {
  const { theme, dark, children } = props;
  const [isLightTheme, setLightTheme] = useState<boolean>(true);

  const toggleTheme = () => setLightTheme((previousState) => !previousState);

  const appTheme: ContextProps = {
    colors: theme,
    typography,
    borders: border,
    spacing,
    toggleTheme,
    dark,
  };

  return <ThemeContext.Provider value={appTheme}>{children}</ThemeContext.Provider>;
};
