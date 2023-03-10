import React from "react";
import { StyleSheet } from "react-native";

import FirebaseImage from "@components/FirebaseImage";

import { useAppSelector, useThemedStyles } from "@hooks/index";
import { RootState } from "@services/store";

import { ContextProps } from "@themes/index";

const AVATAR_SIZE = 50;

const Avatar: React.FC = React.memo(() => {
  const avatar = useAppSelector((state: RootState) => state.session.user.picture);

  const style = useThemedStyles(styles);

  return <FirebaseImage url={avatar} style={style.avatar} />;
});

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    avatar: {
      borderRadius: theme.borders.radius.circle,
      backgroundColor: theme.colors.border,
      height: AVATAR_SIZE,
      width: AVATAR_SIZE,
    },
  });

export default Avatar;
