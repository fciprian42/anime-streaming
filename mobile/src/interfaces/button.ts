import { Color } from "@themes/index";

export type ButtonType = "opacity" | "pressable" | "social" | "none";

export type ButtonTheme = "primary" | "secondary" | "transparent";

export type ShadowConfig = {
  shadowColor: Color;
  shadowOffset: { width: number; height: number };
  shadowRadius: number;
  shadowOpacity: number;
};
