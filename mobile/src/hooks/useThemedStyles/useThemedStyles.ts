import { useTheme } from "@hooks/index";

export const useThemedStyles = (styles: any) => {
  const theme = useTheme();
  return styles(theme);
};
