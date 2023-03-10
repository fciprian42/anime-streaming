import React from "react";
import { ViewStyle } from "react-native";

import Button from "@components/Button";

import { Apple, Facebook, Google } from "@assets/icons/svg/social";
import { useTheme } from "@hooks/index";

interface SocialProps {
  title: string;
  icon: "apple" | "google" | "facebook";
  style: ViewStyle;

  onPress: () => void;
}

export const SocialButton: React.FC<SocialProps> = React.memo((props) => {
  const { title, icon, style, onPress } = props;
  const { dark } = useTheme();

  return (
    <Button
      type="social"
      theme="primary"
      color="textBody"
      onPress={onPress}
      icon={
        icon === "apple" ? (
          <Apple fill={dark ? "#fff" : "#000"} />
        ) : icon === "facebook" ? (
          <Facebook />
        ) : (
          <Google />
        )
      }
      content={title}
      buttonStyles={style}
    />
  );
});
